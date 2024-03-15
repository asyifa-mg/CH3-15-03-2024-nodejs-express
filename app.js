const express = require("express");
const morgan = require("morgan");

const app = express();

const customerRouter = require("./routes/customerRoutes");

//middelware untuk membaca json dari request body ke kita
app.use(express.json()); //midelware bawaan dari  express

//midelware dari third party = 3 rd party middelware
app.use(morgan("dev"));

//midelware kita sendiri
app.use((req, res, next) => {
  console.log("Hello FSW 1, ini middleware kita sendiri..");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/customers", customerRouter);

module.exports = app;
