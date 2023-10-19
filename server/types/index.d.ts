import { User } from "./user.type";

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}
