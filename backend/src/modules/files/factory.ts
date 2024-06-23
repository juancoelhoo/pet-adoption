import { UploadFileUseCase } from "./domain/usecases/uploadFileUseCase";
import { CloudinaryFileUploader } from "@src/infra/services/cloudinary/cloudinaryFileUploader";

const fileUploader = new CloudinaryFileUploader();

export const uploadFileFactory = () => {
  return new UploadFileUseCase(fileUploader);
};
