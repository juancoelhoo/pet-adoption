import { User } from './src/modules/users/domain/entities/user';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}