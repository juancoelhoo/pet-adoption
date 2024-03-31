import "./utils/module-alias";

import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", ".env") });

import { SetupServer } from "@src/infra/api/server";

const PORT = Number(process.env.PORT);

new SetupServer(PORT).start();
