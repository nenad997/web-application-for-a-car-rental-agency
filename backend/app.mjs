import * as ENV from "dotenv";
import { join } from "path";
import express from "express";
import cors from "cors";
import { connect } from "mongoose";

import authRoutes from "./routes/auth.mjs";
import feedRoutes from "./routes/feed.mjs";

ENV.config();

const MONGO_DB_URL = `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.ovwtp0c.mongodb.net/${process.env.data_base}`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(join(process.cwd(), "public")));

app.use("/api", authRoutes);
app.use(feedRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  const data = err?.data;
  const path = err?.path;

  res.status(status).json({ message, data, path, hasResponseFailed: true });
});

connect(MONGO_DB_URL)
  .then((res) => {
    console.log(`App is running on port ${process.env.port}`);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
