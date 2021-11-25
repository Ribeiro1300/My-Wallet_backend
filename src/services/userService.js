import * as userRepository from "../repositories/userRepository";
import { v4 as uuid } from "uuid";

async function signup(name, email, password) {
  const passwordHash = bcrypt.hashSync(password, 10);

  const result = await userRepository.signup(name, email, passwordHash);
  return result;
}

async function getUserByEmail(email) {
  const result = await userRepository.getUserByEmail(email);

  return result.rows[0];
}
async function createSession(id) {
  const token = uuid();
  await userRepository.createSession(id, token);
  return token;
}

async function deleteSession(token) {
  const result = await userRepository.deleteSession(token);
  return result;
}

export { signup, getUserByEmail, createSession, deleteSession };
