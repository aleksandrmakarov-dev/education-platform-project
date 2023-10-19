import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../utils/api-errors.utls";

export default function RoleBasedProtectionMiddleware(roles?: string[]) {
  return function (req: Request, _res: Response, next: NextFunction) {
    const user = req.currentUser;

    if (!user) {
      throw new UnAuthorizedError("Route requires authorization");
    }

    if (roles && !user.roles.some((role: any) => roles.includes(role))) {
      throw new UnAuthorizedError(
        "User doesn't have enough rights to access route"
      );
    }

    next();
  };
}
