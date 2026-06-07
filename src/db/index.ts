import { Pool } from "pg";
import envConfig from "../config";

export const pool = new Pool({
  connectionString: envConfig.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,

        name VARCHAR(40) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password text NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'contributor',

        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ  DEFAULT NOW() 
      )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,

        type VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'open',

        reporter_id INTEGER NOT NULL,

        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`);

    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
