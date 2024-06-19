import express from "express";
import http from "http";
import cors from "cors";
import pg from "pg";

import routes from "./routes";
import init from "./models";

const app = express();
const Client = pg.Client;

const client = new Client({
  connectionString:
    "postgresql://postgres:123456@localhost:5432/mern?schema=public",
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(routes);

const server = new http.Server(app);

const connect = async () => {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database!");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

connect().then(() => {
  server.listen(5000, "127.0.0.1", () => {
    console.log("Running Server on ", 5000);
  });
});

init();
