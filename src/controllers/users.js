import connection from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid, v4 } from "uuid";

async function postUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    await connection.query(
      `
        INSERT INTO users
        (name, email, password)
        VALUES ($1, $2, $3)
    `,
      [name, email, passwordHash]
    );

    res.sendStatus(201);
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
        const token = v4();

        await connection.query(
          `
              INSERT INTO sessions ("userId", token)
              VALUES ($1, $2)
            `,
          [user.id, token]
        );

        res.send(token);
      } else {
        res.status(401).send("Usuário não encontrado");
      }
    }
  } catch (error) {
    res.send(error);
  }
}

export { postUser, login };
