import "./setup.js"
import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log("Magic happening on port " + process.env.PORT);
  console.log("Magic happening on db " + process.env.DATABASE_URL);
});
