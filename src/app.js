import express from "express";
import cors from "cors";
import * as usersController from "./controllers/usersController";
import * as recordsController from "./controllers/recordsController";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/users", usersController.signup);

app.post("/userLogin", usersController.login);

app.post("/deleteSession", usersController.deleteCurrentSession);

app.get("/records", recordsController.getRecords);

app.post("/records", recordsController.postRecords);

export default app;
