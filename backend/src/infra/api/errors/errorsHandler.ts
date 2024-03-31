import { Logger } from "@src/utils/logger";
import { NextFunction, Request, Response } from "express";

import { CustomError } from "./customError";

export class ErrorsHandler {
  private static LOG_TAG = "ErrorsHandler";

  public static allErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof CustomError) {
      Logger.e(
        ErrorsHandler.LOG_TAG,
        `Status: ${err.statusCode}, Message: ${err.message}`,
        err
      );
      return res.status(err.statusCode).json({
        message: err.message,
        stackTrace: err.stack || null,
        timestamp: "",
      });
    }

    Logger.e(
      ErrorsHandler.LOG_TAG,
      `Status: 500, Message: Internal Server Error`
    );
    return res.status(500).json({
      message: "Internal Server Error",
      stackTrace: err.stack || null,
      timestamp: "",
    });
  }
}
