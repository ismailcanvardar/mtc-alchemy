const express = require("express");
const { checkSignature } = require("../middlewares");

const MainController = require("../controllers");

const mainController = new MainController();

class MainRoute {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/price", checkSignature, mainController.getPrice);

    this.router.post("/submit-order", checkSignature, mainController.submitOrder);
  }
}

module.exports = MainRoute;
