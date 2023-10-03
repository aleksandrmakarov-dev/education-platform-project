import { Word } from "../lib/types";
import { WordFormSchemaType } from "../lib/validations/word-form.schema";
import BaseService from "./base.service";

const baseUrl = "http://localhost:3000/api/words";

const baseServiceFunctions = BaseService<WordFormSchemaType, Word>(baseUrl);

const WordsService = { ...baseServiceFunctions };

export default WordsService;
