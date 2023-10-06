import { Response } from "express";

function Ok(res: Response, data: any) {
  return res.status(200).json(data);
}

function Created(res: Response, data: any) {
  return res.status(201).json(data);
}

function NoContent(res: Response) {
  res.status(204).end();
}

export { Ok, Created, NoContent };
