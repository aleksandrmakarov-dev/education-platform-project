import { Word } from "../lib/types";
import { WordFormSchemaType } from "../lib/validations/word-form.schema";
import BaseService from "./base.service";

const baseUrl = `${import.meta.env.VITE_PUBLIC_URL}/api/words`;

const baseServiceFunctions = BaseService<WordFormSchemaType, Word>(baseUrl);

const WordsService = { ...baseServiceFunctions };

export default WordsService;
