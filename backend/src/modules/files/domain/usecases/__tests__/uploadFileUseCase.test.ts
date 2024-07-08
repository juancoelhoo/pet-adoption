import { mock, MockProxy } from 'jest-mock-extended';
import { UploadFileUseCase } from '../uploadFileUseCase';
import { FileUploader } from '../../interfaces/FileUploader';

describe('UploadFileUseCase', () => {
  let useCase: UploadFileUseCase;
  let fileUploader: MockProxy<FileUploader>;

  beforeEach(() => {
    fileUploader = mock<FileUploader>();
    useCase = new UploadFileUseCase(fileUploader);
  });

  it('should upload the given file', async () => {
    const filePath = "https://site.com/link.png";
    fileUploader.uploadFile.mockResolvedValue(filePath);

    const result = await useCase.execute(filePath);

    expect(result).toEqual(filePath);
    expect(fileUploader.uploadFile).toHaveBeenCalledWith(filePath, "jpg");
  });
});
