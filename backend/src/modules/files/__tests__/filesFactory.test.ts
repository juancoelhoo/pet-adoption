import { uploadFileFactory } from "../factory";
import { FileUploader } from "../domain/interfaces/FileUploader";
import { CloudinaryFileUploader } from "@src/infra/services/cloudinary/cloudinaryFileUploader";
import { UploadFileUseCase } from "../domain/usecases/uploadFileUseCase";

jest.mock("@src/infra/services/cloudinary/cloudinaryFileUploader");

describe("Complaints Factory", () => {
  let fileUploader: FileUploader;

  beforeEach(() => {
    fileUploader = new CloudinaryFileUploader();
    (CloudinaryFileUploader as jest.Mock).mockReturnValue(fileUploader);
  });

  describe("uploadFileFactory", () => {
    it("should create an instance of UploadFileUseCase", () => {
      const useCase = uploadFileFactory();
      expect(useCase).toBeInstanceOf(UploadFileUseCase);
      expect(useCase['fileUploader']).toBeInstanceOf(CloudinaryFileUploader);
    });
  });
});