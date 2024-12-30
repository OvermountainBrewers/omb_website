import { google } from "googleapis";
import type { drive_v3 } from "googleapis";
import { Storage } from "@google-cloud/storage";
import path from "path";
import * as functions from "@google-cloud/functions-framework";
import { processNewImage } from "./importDrivePhotos";
import { createClient } from "@sanity/client";
import { Request, Response } from "express";

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID!;
const BUCKET_NAME = "omb-photo-sync-drive-tokens";
const TOKEN_FILE = "drive-sync-token.txt";

const storage = new Storage();
const bucket = storage.bucket(BUCKET_NAME);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
});

async function reindexFolder(folderId: string, folderName: string) {
  const query = `*[_type == "galleryImage" && sourceFolder == $folderId] | order(date asc)`;
  const images = await client.fetch(query, { folderId });

  console.log(`Reindexing ${images.length} images in folder ${folderName}`);

  for (let i = 0; i < images.length; i++) {
    await client
      .patch(images[i]._id)
      .set({
        title: `${folderName} - Photo ${i + 1}`,
        alt: `${folderName} - Photo ${i + 1}`,
      })
      .commit();
  }
}

async function removeImage(fileId: string) {
  const query = `*[_type == "galleryImage" && sourceFileId == $fileId][0]`;
  const image = await client.fetch(query, { fileId });

  if (image) {
    console.log(`Removing image ${image.title} from Sanity`);
    await client.delete(image._id);

    // If the image has an asset, delete that too
    if (image.image?.asset?._ref) {
      await client.delete(image.image.asset._ref);
    }

    return image.sourceFolder; // Return folder ID for reindexing
  }
  return null;
}

async function getStartPageToken(drive: drive_v3.Drive): Promise<string> {
  const response = await drive.changes.getStartPageToken({});
  return response.data.startPageToken || "";
}

async function getStoredPageToken(): Promise<string | null> {
  try {
    const file = bucket.file(TOKEN_FILE);
    const exists = (await file.exists())[0];

    if (!exists) return null;

    const content = await file.download();
    return content.toString().trim();
  } catch (error) {
    console.error("Error reading token:", error);
    return null;
  }
}

async function storePageToken(token: string): Promise<void> {
  try {
    const file = bucket.file(TOKEN_FILE);
    await file.save(token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
}

// Register the HTTP function with the Functions Framework
functions.http("watchDriveChanges", async (req: Request, res: Response) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const drive = google.drive({
    version: "v3",
    auth: (await auth.getClient()) as any,
  }) as drive_v3.Drive;

  try {
    // Get token from storage or start fresh
    let pageToken = await getStoredPageToken();
    if (!pageToken) {
      pageToken = await getStartPageToken(drive);
      console.log("No stored token found, starting fresh with:", pageToken);
    }

    const response = await drive.changes.list({
      pageToken,
      spaces: "drive",
      fields:
        "changes(file(id,name,parents,createdTime),removed,fileId),newStartPageToken",
    });

    const changes = response.data.changes || [];
    const processedFolders = new Set<string>(); // Track which folders we've reindexed

    for (const change of changes) {
      if (change.removed) {
        // Handle removed files
        const folderId = await removeImage(change.fileId!);
        if (folderId && !processedFolders.has(folderId)) {
          // Get folder info to reindex
          const folder = await drive.files.get({
            fileId: folderId,
            fields: "id,name",
          });
          await reindexFolder(folder.data.id!, folder.data.name!);
          processedFolders.add(folderId);
        }
      } else if (
        change.file?.id &&
        change.file?.name &&
        change.file?.parents?.[0]
      ) {
        // Get the event folder info
        const eventFolder = await drive.files.get({
          fileId: change.file.parents[0],
          fields: "id,name,parents",
        });

        // Only process if it's a valid event folder inside our root folder
        if (
          eventFolder.data.id &&
          eventFolder.data.name &&
          eventFolder.data.parents?.includes(FOLDER_ID)
        ) {
          await processNewImage({
            drive,
            file: change.file,
            folder: eventFolder.data,
            photoId: 999999, // Number to be replaced with actual photo ID during reindexing
          });

          // Reindex the folder if we haven't already
          if (!processedFolders.has(eventFolder.data.id)) {
            await reindexFolder(eventFolder.data.id, eventFolder.data.name);
            processedFolders.add(eventFolder.data.id);
          }
        }
      }
    }

    // Store the new token for next time
    if (response.data.newStartPageToken) {
      await storePageToken(response.data.newStartPageToken);
    }

    res.status(200).json({
      success: true,
      newPageToken: response.data.newStartPageToken,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Invalid Change Token")
    ) {
      // Token expired, get and store a new one
      const newToken = await getStartPageToken(drive);
      await storePageToken(newToken);
      res.status(200).json({
        success: false,
        error: "Token expired",
        newPageToken: newToken,
      });
    } else {
      console.error("Error:", error);
      res.status(500).json({ error });
    }
  }
});
