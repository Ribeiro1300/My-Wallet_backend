import * as userService from "../services/userService.js";
import bcrypt from "bcrypt";

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    console.log(user);

    if (user) {
      res.status(409).send("Email já cadastrado");
    } else {
      const result = await userService.signup(name, email, password);

      res.send(result.rows);
    }
  } catch (error) {
    res.send(error);
  }
}

async function login(req, res) {
  try {
    {
      const { email, password } = req.body;

      const user = await userService.getUserByEmail(email);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = await userService.createSession(user.id);
        res.status(201).send(token);
      }
      res.status(401).send("Usuário não encontrado");
    }
  } catch (error) {
    res.send(error);
  }
}

async function deleteCurrentSession(req, res) {
  try {
    const { token } = req.body;
    const result = await userService.deleteSession(token);
    res.status(201).send(result);
  } catch (error) {
    res.sendStatus(401);
  }
}
export { signup, login, deleteCurrentSession };
