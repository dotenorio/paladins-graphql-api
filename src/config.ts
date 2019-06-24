import dotenv from "dotenv";

dotenv.config()

export default {
  PALADINS_API_URL: process.env.PALADINS_API_URL,
  PALADINS_DEV_ID: process.env.PALADINS_DEV_ID,
  PALADINS_AUTH_KEY: process.env.PALADINS_AUTH_KEY
}