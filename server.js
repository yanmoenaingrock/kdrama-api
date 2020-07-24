const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({
  path: "./config.env",
});

const port = process.env.PORT || 8000;

console.log(process.env.NODE_ENV);
console.log(process.env.PORT);
console.log(process.env.DATABASE_LOCAL);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log(err.message);
  });
console.log( process.env.NODE_ENV );
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// kill the running port
// sudo kill -3 `sudo lsof -t -i:3000`