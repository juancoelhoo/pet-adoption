import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";

import { Logger } from "@src/utils/logger";
import { ErrorsHandler } from "./errors/errorsHandler";
import { swaggerSpecs } from "./docs/docsSetup";
import { setupDb } from "./config/database/dbSetup";

import postsRouter from "./modules/posts/routes";
import usersRouter from "./modules/users/routes"; 
import complaintsRouter from "./modules/complaints/routes"; 
import reactionsRouter from "./modules/reactions/routes";
import filesRouter from "./modules/files/routes";
import ratingsRouter from "./modules/ratings/routes";

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
    this.app.use(cookieParser());
    this.app.use(cors({
      credentials: true,
      origin: "http://localhost:3000"
    }));
  }

  private setupDocs(): void {
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  }

  private setupControllers(): void {
    this.app.use("/posts", postsRouter);
    this.app.use("/users", usersRouter); 
    this.app.use("/complaints", complaintsRouter);
    this.app.use("/reactions", reactionsRouter);
    this.app.use("/files", filesRouter);
    this.app.use("/ratings", ratingsRouter);
  }

  private setupErrorHandler(): void {
    this.app.use(ErrorsHandler.allErrors);
  }

  public getApp(): Application {
    return this.app;
  }
}
