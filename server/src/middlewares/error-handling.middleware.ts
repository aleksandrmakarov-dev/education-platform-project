import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../utils/api-errors.utls";

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

  console.log(err);

  return res
    .status(500)
    .json({ title: "Internal error", message: err.message });
}
