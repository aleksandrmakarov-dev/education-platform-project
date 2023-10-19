require("express-async-errors");

import express from "express";
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
import path from "path";

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

app.use(express.static("dist"));

app.use("/api/auth", AuthRouter);
app.use("/api/dictionaries", DictionariesRouter);
app.use("/api/themes", ThemesRouter);
app.use("/api/words", WordsRouter);
app.use("/api/filesystem", FileSystemRouter);

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use(ErrorHandlingMiddleware);

export default app;
