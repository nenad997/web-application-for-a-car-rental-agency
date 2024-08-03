import * as env from "dotenv";
import { join } from "path";
import express from "express";
import cors from "cors";
import { connect } from "mongoose";

import authRoutes from "./routes/auth.mjs";
import feedRoutes from "./routes/feed.mjs";

env.config();

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

connect(
  `mongodb+srv://Nenad:${process.env.password}@cluster0.ovwtp0c.mongodb.net/car-rental-app`
)
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
