import * as userService from "../services/userService";
import bcrypt from "bcrypt";

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!userService.getUserByEmail(email)) {
      res.status(409).send("Email já cadastrado");
    }

    const result = await userService.signup(name, email, password);

    res.status(201).send(result.rows);
  } catch (error) {
    res.send(error);
  }
}

async function login(req, res) {
  try {
    {
      const { email, password } = req.body;

      const user = userService.getUserByEmail(email);

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = userService.createSession(user.id);
        res.status(201).send(token);
      } else {
        res.status(401).send("Usuário não encontrado");
      }
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
