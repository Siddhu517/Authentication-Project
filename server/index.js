import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Routes from "./routes/users";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Routes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Database Connection Error", err));

const port = process.env.PORT;
app.listen(port, () => console.log(`server listening on port:${port}`));
