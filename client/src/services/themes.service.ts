import BaseService from "./base.service";

const baseUrl = "http://localhost:3000/api/themes";

const baseServiceFunctions = BaseService(baseUrl);

const ThemesService = { ...baseServiceFunctions };

export default ThemesService;
