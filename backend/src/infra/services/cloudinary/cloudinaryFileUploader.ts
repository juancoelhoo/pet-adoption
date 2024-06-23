import { v2 as Cloudinary } from "cloudinary";
import { FileUploader } from "@src/modules/files/domain/interfaces/FileUploader";

export class CloudinaryFileUploader implements FileUploader{
    constructor(){
        Cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    async uploadFile(filepath: string, format: string): Promise<string> {
        const options = { format };

        try {
            const result = await Cloudinary.uploader.upload(filepath, options);
            return result.url;
        } catch (error) {
            throw new Error("Error uploading file: " + error);
        }
    }
}