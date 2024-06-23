export interface FileUploader{
    uploadFile(filepath: string, format: string): Promise<string>;
}