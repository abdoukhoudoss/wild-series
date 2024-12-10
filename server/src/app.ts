import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import express from "express";
import router from "./router";

const app = express();

if (process.env.CLIENT_URL != null) {
  app.use(cors({ origin: [process.env.CLIENT_URL] }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const publicFolderPath = path.join(__dirname, "../../server/public");

if (fs.existsSync(publicFolderPath)) {
  app.use(express.static(publicFolderPath));
}

export default app;
