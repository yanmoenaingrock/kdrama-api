const express = require("express");
const app = express();

const dramaRouter = require("./routes/dramaRoutes");
const viewRouter = require("./routes/viewRoutes");

app.use(express.json());
app.use( express.static(`${__dirname}/public`));
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);


app.use("/", viewRouter);


app.use("/api/v1/dramas", dramaRouter);

app.all("*", (req, res, next) => {
  res.status(500).json({
    message: "This route is not defined",
  });
});

app.use((err, req, res, next) => {
  console.log(err.name);
  console.log(err.message);
  res.status(500).json({
    err,
  });
});

module.exports = app;
