require("express-async-errors");

import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import DictionariesRouter from "./routes/dictionaries.routes";
import { connect } from "./database/mongoose";
import ThemesRouter from "./routes/themes.routes";

const app = express();

connect().catch((error: any) => {
  console.log(`failed to establish connection to database`, error.message);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "hello from server!" });
});

app.use("/api/dictionaries", DictionariesRouter);
app.use("/api/themes", ThemesRouter);

export default app;
