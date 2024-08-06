import * as ENV from "dotenv";

ENV.config();

export const MONGO_DB_URL = `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.ovwtp0c.mongodb.net/${process.env.data_base}`;
export const PORT = parseInt(process.env.port) || 8000;
