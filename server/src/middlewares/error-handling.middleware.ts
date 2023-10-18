import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../utils/api-errors.utls";
import mongoose from "mongoose";
import { z } from "zod";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export default function ErrorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ title: "Not found", message: err.message });
  }

  if (err instanceof BadRequestError) {
    return res.status(400).json({ title: "Bad request", message: err.message });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json({ error: err.message });
  }

  if (err instanceof z.ZodError) {
    return res.status(422).json({ error: err.message });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ error: "Token expired" });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ error: "Token must be provided" });
  }

  if (err instanceof UnAuthorizedError) {
    return res.status(401).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ title: "Internal error", message: err.message });
}
