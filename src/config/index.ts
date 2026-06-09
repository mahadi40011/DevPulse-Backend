import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const envConfig = {
  port: process.env.PORT,
  connection_string: process.env.CONNECTION_STRING,
  jwt_secret: process.env.JWT_SECRET,
  client_url: process.env.CLIENT_URL,
  development_url: process.env.DEVELOPMENT_URL,
};

export default envConfig;
