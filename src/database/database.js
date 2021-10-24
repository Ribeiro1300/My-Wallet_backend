import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
  host: "ec2-52-0-234-93.compute-1.amazonaws.com",
  port: 5432,
  user: "lwgpjxpzkeucvb",
  password: "345344ef1009a718d17398a554ee3198914472bab818d33214c75e02b5ca3e1e",
  database: "heroku pg:psql postgresql-pointy-02147 --app my-wallet-projeto14",
});

export default connection;
