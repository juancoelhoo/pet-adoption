import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";

import { Logger } from "@src/utils/logger";
import { ErrorsHandler } from "./errors/errorsHandler";
import { swaggerSpecs } from "./docs/docsSetup";
import { setupDb } from "./database/dbSetup";

import examplesRouter from "./modules/examples/routes";

export class SetupServer {
  private static LOG_TAG = "SetupServer";

  private app: Application;

  constructor(private port = 3333) {
    this.app = express();

    this.setupDatabase();
    this.setupMiddlewares();
    this.setupDocs();
    this.setupControllers();
    this.setupErrorHandler();
  }

  public async start(): Promise<void> {
    this.app.listen(this.port, () => {
      Logger.i(
        SetupServer.LOG_TAG,
        `Server is listening on port: ${this.port}`
      );
    });
  }

  private setupDatabase(): void {
    setupDb();
  }

  private setupMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private setupDocs(): void {
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  }

  private setupControllers(): void {
    this.app.use("/examples", examplesRouter);
  }

  private setupErrorHandler(): void {
    this.app.use(ErrorsHandler.allErrors);
  }

  public getApp(): Application {
    return this.app;
  }
}