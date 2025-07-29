import express from "express";
import cors from "cors";
import { connect } from "mongoose";

import { MONGO_DB_URL, PORT } from "./util/constants.mjs";
import authRoutes from "./routes/auth.mjs";
import feedRoutes from "./routes/feed.mjs";
import usersRoutes from "./routes/user.mjs";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads/images", express.static("./uploads/images"));

app.use("/api/user", authRoutes);
app.use("/api/cars", feedRoutes);
app.use("/api/users", usersRoutes);

app.use((err, req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message;
  const data = err?.data;
  const path = err?.path;

  res.status(status).json({ message, data, path, hasResponseFailed: true });
});

connect(MONGO_DB_URL)
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
