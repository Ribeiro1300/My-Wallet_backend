import express from "express";
import cors from "cors";
import { postUser, login, getEmails } from "./controllers/users.js";
import { getRecords, postRecords } from "./controllers/records.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/users", getEmails);

app.post("/users", postUser);

app.post("/userLogin", login);

app.get("/records", getRecords);

app.post("/records", postRecords);

export default app;
