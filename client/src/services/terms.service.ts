import BaseService from "./base.service";

const baseUrl = "http://localhost:3000/api/terms";

const baseServiceFunctions = BaseService(baseUrl);

const TermsService = { ...baseServiceFunctions };

export default TermsService;
