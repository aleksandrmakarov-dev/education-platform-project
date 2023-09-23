import app from "./app";
import AppConfig from "./config/app.config";

app.listen(AppConfig.PORT, () => {
  console.log(`Listening at http://localhost:${AppConfig.PORT}`);
});
