import { UserModel } from "../src/modules/users/userModel";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                name: string;
                permissions: number;
            };
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            APP_URL: string;
            PORT: number;
            DATABASE_URL: string;
            SECRET_KEY: string;
            JWT_EXPIRATION: string;
            NODE_ENV: string;
        }
    }
}

export {};
