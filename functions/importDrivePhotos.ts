import { google } from "googleapis";
import type { drive_v3 } from "googleapis";
import { createClient } from "@sanity/client";
import { GaxiosResponse } from "googleapis-common";
import sharp from "sharp";

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID!;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
});

async function listAllFolders(drive: drive_v3.Drive, folderId: string) {
  const folders: drive_v3.Schema$File[] = [];
  let pageToken: string | null = null;

  do {
    const response = (await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: "nextPageToken, files(id, name)",
      pageToken: pageToken || undefined,
    })) as GaxiosResponse<drive_v3.Schema$FileList>;

    if (response.data.files) {
      folders.push(...response.data.files);
    }
    pageToken = response.data.nextPageToken || null;
  } while (pageToken);

  return folders;
}

async function checkIfImageExists(fileId: string, folderId: string) {
  const query = `*[_type == "galleryImage" && sourceFolder == $folderId && sourceFileId == $fileId][0]`;
  const params = { fileId, folderId };

  const exists = await client.fetch(query, params);
  return !!exists;
}

enum FileProcessStatus {
  SKIPPED = "skipped",
  PROCESSED = "processed",
  FAILED = "failed",
}

interface ProcessNewImageParams {
  drive: drive_v3.Drive;
  file: drive_v3.Schema$File;
  folder: drive_v3.Schema$File;
  photoId: number;
}

export async function processNewImage({
  drive,
  file,
  folder,
  photoId,
}: ProcessNewImageParams): Promise<FileProcessStatus> {
  try {
    if (!file.id || !folder.id || !file.name) {
      console.log("Missing required file properties");
      return FileProcessStatus.FAILED;
    }

    const exists = await checkIfImageExists(file.id, folder.id);
    if (exists) {
      console.log(`Skipping ${file.name} - already processed`);
      return FileProcessStatus.SKIPPED;
    }

    const imageResponse = await drive.files.get(
      {
        fileId: file.id,
        alt: "media",
      },
      { responseType: "arraybuffer" },
    );

    let imageAsset;
    try {
      const convertedImage = await sharp(
        Buffer.from(imageResponse.data as ArrayBuffer),
        {
          failOnError: false,
          limitInputPixels: 0,
          sequentialRead: true,
          pages: 1,
        },
      )
        .rotate()
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({ quality: 90, force: true, mozjpeg: true })
        .toBuffer({ resolveWithObject: true });

      imageAsset = await client.assets.upload("image", convertedImage.data, {
        filename: file.name.replace(/\.[^/.]+$/, "") + ".jpg",
        contentType: "image/jpeg",
      });
    } catch (error) {
      console.error(`Failed to process ${file.name}, skipping...`);
      return FileProcessStatus.FAILED;
    }

    await client.create({
      _type: "galleryImage",
      title: `${folder.name} - Photo ${photoId}`,
      event: folder.name,
      date: new Date(file.createdTime || Date.now()).toISOString(),
      alt: `${folder.name} - Photo ${photoId}`,
      sourceFolder: folder.id,
      sourceFileId: file.id,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
    });

    console.log(`Processed ${file.name}`);
    return FileProcessStatus.PROCESSED;
  } catch (error) {
    console.error(`Error processing file ${file.name}:`, error);
    return FileProcessStatus.FAILED;
  }
}

async function processFolder(
  drive: drive_v3.Drive,
  folder: drive_v3.Schema$File,
) {
  try {
    if (!folder.name || !folder.id) return;
    console.log(`Processing folder: ${folder.name}`);

    const response = await drive.files.list({
      q: `'${folder.id}' in parents and mimeType contains 'image/'`,
      fields: "files(id, name, createdTime, webContentLink)",
    });

    const files = response.data.files || [];
    console.log(`Found ${files.length} images in folder ${folder.name}`);

    for (const [index, file] of files.entries()) {
      const status = await processNewImage({
        drive,
        file,
        folder,
        photoId: index + 1,
      });
      if (status === FileProcessStatus.FAILED) {
        console.error(`Failed to process file ${file.name}`);
      }
    }
  } catch (error) {
    console.error(`Error processing folder ${folder.name}:`, error);
  }
}

async function importPhotosFromDrive() {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({
      version: "v3",
      auth: (await auth.getClient()) as any,
    }) as drive_v3.Drive;

    const folders = await listAllFolders(drive, FOLDER_ID);
    console.log(`Found ${folders.length} folders to process`);

    for (const folder of folders) {
      await processFolder(drive, folder);
    }
  } catch (error) {
    console.error("Error importing photos:", error);
  }
}

importPhotosFromDrive().catch(console.error);
