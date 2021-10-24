import express from "express";
import cors from "cors";
import { postUser, login, deleteCurrentSession } from "./controllers/users.js";
import { getRecords, postRecords } from "./controllers/records.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/users", postUser);

app.post("/userLogin", login);

app.post("/deleteSession", deleteCurrentSession);

app.get("/records", getRecords);

app.post("/records", postRecords);

export default app;
