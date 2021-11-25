import connection from "../database/database.js";

async function getRecords(req, res) {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    const result = await connection.query(
      `
      SELECT * FROM sessions
      JOIN users
      ON sessions.userId = users.id
      WHERE sessions.token = $1
    `,
      [token]
    );

    const user = result.rows[0];

    if (user) {
      const allRecords = await connection.query("SELECT * FROM records WHERE userid = $1;", [
        user.id,
      ]);
      res.status(201).send({ records: allRecords.rows, name: user.name });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(error);
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
              ON sessions.userId = users.id
              WHERE sessions.token = $1
            `,
        [token]
      );

      const user = result.rows[0];
      if (user) {
        const { description, date, type, value } = req.body;
        await connection.query(
          `INSERT INTO records (userId,description, date, type, value) VALUES ($1, $2, $3, $4,$5);`,
          [user.id, description, date, type, value]
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
