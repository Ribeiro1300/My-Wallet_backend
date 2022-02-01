import connection from "../database/database.js";

async function signup(name, email, password) {
  return await connection.query(
    `
        INSERT INTO users
        (name, email, password)
        VALUES ($1, $2, $3)
    `,
    [name, email, password]
  );
}

async function getUserByEmail(email) {
  return await connection.query(
    `
                SELECT * FROM users
                WHERE email = $1
            `,
    [email]
  );
}

async function createSession(id, token) {
  return await connection.query("INSERT INTO sessions (userId, token) VALUES ($1, $2);", [
    id,
    token,
  ]);
}

async function deleteSession(token) {
  return await connection.query("DELETE FROM sessions WHERE token = $1;", [token]);
}

export { signup, getUserByEmail, createSession, deleteSession };
