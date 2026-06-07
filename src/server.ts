import app from "./app";
import envConfig from "./config";
import { initDB } from "./db";

const main = () => {
  initDB()
  app.listen(envConfig.port, () => {
    console.log(`DevPuls server listening on port ${envConfig.port}`);
  });
}

main()