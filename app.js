const path = require("path");
require("dotenv").config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"
  ),
});
const express = require("express");
const helmet = require("helmet");
const MainRoute = require("./src/routes");
const connectDatabase = require("./src/utils/db");
const { PORT } = require("./src/constants");
const { sendFundsAndCompleteOrder } = require("./src/helpers");

const mainRoute = new MainRoute();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(mainRoute.router);

app.get("/", (req, res) => {
  res.send("OK!");
});

app.listen(PORT, async () => {
  connectDatabase();

  setInterval(async () => {
    await sendFundsAndCompleteOrder();
  }, 15000);

  console.info("Server is started at port", PORT);
});
