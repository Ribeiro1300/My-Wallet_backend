import express from "express";
import cors from "cors";
import { postUser, login } from "./controllers/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/users", postUser);

app.post("/login", login);

export default app;
