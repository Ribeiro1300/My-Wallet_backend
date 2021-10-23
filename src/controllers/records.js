import connection from "../database/database";

async function getRecords(req, res) {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    const result = await connection.query(
      `
      SELECT * FROM sessions
      JOIN users
      ON sessions."userId" = users.id
      WHERE sessions.token = $1
    `,
      [token]
    );

    const user = result.rows[0];

    if (user) {
      const allRecords = await connection.query(`SELECT * FROM records WHERE id = $1`, [user.id]);
      res.status(200).send(allRecords);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.send(error);
  }
}

async function postRecords(req, res) {
  try {
    {
      const authorization = req.headers["authorization"];
      const token = authorization?.replace("Bearer ", "");

      if (!token) return res.sendStatus(401);

      const result = await connection.query(
        `
              SELECT * FROM sessions
              JOIN users
              ON sessions."userId" = users.id
              WHERE sessions.token = $1
            `,
        [token]
      );

      const user = result.rows[0];

      if (user) {
        const { description, date, type, value } = req.body;
        const postRecord = await connection.query(
          `INSERT INTO records (description, date, type, value) VALUES ($1, $2, $3, $4)`,
          [description, date, type, value]
        );
        res.sendStatus(201);
      } else {
        res.sendStatus(401);
      }
    }
  } catch (error) {
    res.send(error);
  }
}

export { getRecords, postRecords };
