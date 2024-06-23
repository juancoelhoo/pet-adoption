import { FileUploader } from "../interfaces/FileUploader";

export class UploadFileUseCase {
    constructor(private fileUploader: FileUploader){}

    async execute(filePath: string): Promise<string>{
        return await this.fileUploader.uploadFile(filePath, "jpg");
    }
}