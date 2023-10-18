require("express-async-errors");

import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import DictionariesRouter from "./routes/dictionaries.routes";
import { connect } from "./database/mongoose";
import ThemesRouter from "./routes/themes.routes";
import { cloudinaryConfigure } from "./config/cloudinary.config";
import FileSystemRouter from "./routes/filesystem.routes";
import WordsRouter from "./routes/words.routes";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware";
import TokenExtractorMiddleware from "./middlewares/token-extractor.middleware";
import AuthRouter from "./routes/auth.routes";

cloudinaryConfigure();

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
app.use(TokenExtractorMiddleware);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "hello from server!" });
});

app.use("/api/auth", AuthRouter);
app.use("/api/dictionaries", DictionariesRouter);
app.use("/api/themes", ThemesRouter);
app.use("/api/words", WordsRouter);
app.use("/api/filesystem", FileSystemRouter);

app.use(ErrorHandlingMiddleware);

export default app;
