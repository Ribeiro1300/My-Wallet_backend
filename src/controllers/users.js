import connection from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function postUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const allEmails = await connection.query(`SELECT email FROM users;`);
    const emailExists = allEmails.rows.some((info) => {
      return info.email == email;
    });
    if (emailExists) {
      res.status(409).send("Email já cadastrado");
      return;
    }
    const passwordHash = bcrypt.hashSync(password, 10);

    const result = await connection.query(
      `
        INSERT INTO users
        (name, email, password)
        VALUES ($1, $2, $3)
    `,
      [name, email, passwordHash]
    );

    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
}

async function login(req, res) {
  try {
    {
      const { email, password } = req.body;

      const result = await connection.query(
        `
            SELECT * FROM users
            WHERE email = $1
        `,
        [email]
      );

      const user = result.rows[0];

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await connection.query("INSERT INTO sessions (userId, token) VALUES ($1, $2);", [
          user.id,
          token,
        ]);
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
    const result = await connection.query("DELETE FROM sessions WHERE token = $1;", [token]);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(401);
  }
}
export { postUser, login, deleteCurrentSession };
