import { Word } from "../lib/types";
import { WordFormSchemaType } from "../lib/validations/word-form.schema";
import BaseService from "./base.service";

const baseUrl = `/api/words`;

const baseServiceFunctions = BaseService<WordFormSchemaType, Word>(baseUrl);

const WordsService = { ...baseServiceFunctions };

export default WordsService;
