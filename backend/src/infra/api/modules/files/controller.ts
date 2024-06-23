import { uploadFileFactory } from "@src/modules/files/factory";
import { Request, Response, NextFunction } from "express";

class FilesController {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const filePath = req.file?.path;

      if(!filePath) throw new Error("No file received!");

      const url = await uploadFileFactory().execute(filePath);

      return res
        .status(200)
        .json({
          message: "File uploaded successfully!",
          body: url
        });
    } catch (error) {
      return next(error);
    }
  }
}

export default new FilesController();
