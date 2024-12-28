import { google } from 'googleapis';
import { client } from '../site/lib/sanity/sanity_client';
import path from 'path';

const FOLDER_ID = '1IF1YmKFuPbWiJ1TTKXS1mFMOPx4y-q78';
const KEY_PATH = path.join(process.cwd(), '.keys', 'service-account.json');

async function listAllFolders(drive: any, folderId: string) {
    const folders: any[] = [];
    let pageToken = null;

    do {
        const response = await drive.files.list({
            q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
            fields: 'nextPageToken, files(id, name)',
            pageToken: pageToken
        });

        folders.push(...response.data.files);
        pageToken = response.data.nextPageToken;
    } while (pageToken);

    return folders;
}

async function processFolder(drive: any, folder: any) {
    try {
        console.log(`Processing folder: ${folder.name}`);

        // Get all images in the folder
        const response = await drive.files.list({
            q: `'${folder.id}' in parents and mimeType contains 'image/'`,
            fields: 'files(id, name, createdTime, webContentLink)',
        });

        const files = response.data.files;
        console.log(`Found ${files.length} images in folder ${folder.name}`);

        // Process each image
        for (const [index, file] of files.entries()) {
            try {
                // Create Sanity document
                await client.create({
                    _type: 'galleryImage',
                    title: `${folder.name} - Photo ${index + 1}`,
                    event: folder.name,
                    date: new Date(file.createdTime).toISOString(),
                    alt: `${folder.name} - Photo ${index + 1}`,
                    sourceFolder: folder.id,
                    image: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            // We'll need to handle the actual image upload
                            // This part needs additional code
                        }
                    }
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
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });
        const drive = google.drive({ version: 'v3', auth });

        const folders = await listAllFolders(drive, FOLDER_ID);
        console.log(`Found ${folders.length} folders to process`);

        for (const folder of folders) {
            await processFolder(drive, folder);
        }

    } catch (error) {
        console.error('Error importing photos:', error);
    }
}

// Run the import
importPhotosFromDrive().catch(console.error); 