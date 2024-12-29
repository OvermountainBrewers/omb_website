import { google } from "googleapis";
import { client } from "../site/lib/sanity/sanity_client";
import path from "path";

const FOLDER_ID = "1IF1YmKFuPbWiJ1TTKXS1mFMOPx4y-q78";
const KEY_PATH = path.join(process.cwd(), ".keys", "service-account.json");

async function listAllFolders(drive: any, folderId: string) {
  const folders: any[] = [];
  let pageToken = null;

  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: "nextPageToken, files(id, name)",
      pageToken: pageToken,
    });

    folders.push(...response.data.files);
    pageToken = response.data.nextPageToken;
  } while (pageToken);

  return folders;
}

async function checkIfImageExists(fileId: string, folderId: string) {
  // Query Sanity for existing image with same source file
  const query = `*[_type == "galleryImage" && sourceFolder == $folderId && sourceFileId == $fileId][0]`;
  const params = { fileId, folderId };

  const exists = await client.fetch(query, params);
  return !!exists;
}

async function processFolder(drive: any, folder: any) {
  try {
    console.log(`Processing folder: ${folder.name}`);

    const response = await drive.files.list({
      q: `'${folder.id}' in parents and mimeType contains 'image/'`,
      fields: "files(id, name, createdTime, webContentLink)",
    });

    const files = response.data.files;
    console.log(`Found ${files.length} images in folder ${folder.name}`);

    // Process each image
    for (const [index, file] of files.entries()) {
      try {
        // Check if image was already processed
        const exists = await checkIfImageExists(file.id, folder.id);
        if (exists) {
          console.log(`Skipping ${file.name} - already processed`);
          continue;
        }

        // Download image from Drive
        const imageResponse = await drive.files.get(
          {
            fileId: file.id,
            alt: "media",
          },
          {
            responseType: "arraybuffer",
          },
        );

        // Upload to Sanity
        const imageAsset = await client.assets.upload(
          "image",
          Buffer.from(imageResponse.data),
        );

        // Create Sanity document
        await client.create({
          _type: "galleryImage",
          title: `${folder.name} - Photo ${index + 1}`,
          event: folder.name,
          date: new Date(file.createdTime).toISOString(),
          alt: `${folder.name} - Photo ${index + 1}`,
          sourceFolder: folder.id,
          sourceFileId: file.id, // Add Drive file ID for tracking
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          },
        });

        console.log(`Processed ${file.name}`);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }
  } catch (error) {
    console.error(`Error processing folder ${folder.name}:`, error);
  }
}

async function importPhotosFromDrive() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_PATH,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    const drive = google.drive({ version: "v3", auth });

    const folders = await listAllFolders(drive, FOLDER_ID);
    console.log(`Found ${folders.length} folders to process`);

    for (const folder of folders) {
      await processFolder(drive, folder);
    }
  } catch (error) {
    console.error("Error importing photos:", error);
  }
}

// Run the import
importPhotosFromDrive().catch(console.error);
