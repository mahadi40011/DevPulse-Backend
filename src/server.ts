import app from "./app";
import envConfig from "./config";

const main = () => {
  app.listen(envConfig.port, () => {
    console.log(`DevPuls server listening on port ${envConfig.port}`);
  });
}

main()