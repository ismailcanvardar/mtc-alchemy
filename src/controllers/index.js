const MainRepository = require("../repositories");
const { SUCCESS_CODE, FAIL_CODE } = require("../constants");
const { responseHandler } = require("../helpers");

const mainRepository = new MainRepository();

class MainController {
  getPrice(req, res) {
    const price = mainRepository.getPrice();
    const networkList = mainRepository.getNetworkList();

    const { crypto } = req.body;

    if (!crypto) {
      return res.json(
        responseHandler(
          null,
          false,
          FAIL_CODE,
          "The body param {crypto} was not provided!"
        )
      );
    }

    console.log(crypto);

    res.json(
      responseHandler(
        { price, networkList },
        true,
        SUCCESS_CODE,
        "Price fetched successfully!"
      )
    );
  }

  async submitOrder(req, res) {
    const {
      orderNo,
      crypto,
      network,
      address,
      cryptoAmount,
      cryptoPrice,
      usdtAmount,
    } = req.body;

    const { appid, timestamp, sign } = req.headers;

    if (
      !orderNo ||
      !crypto ||
      !network ||
      !address ||
      !cryptoAmount ||
      !cryptoPrice ||
      !usdtAmount
    ) {
      res.json(responseHandler(null, false, FAIL_CODE, "Lack of body params!"));
    }

    try {
      const order = await mainRepository.getOrderFromNumber(orderNo);

      if (order) {
        return res.json(
          responseHandler(null, false, FAIL_CODE, "Order is already submitted!")
        );
      }

      await mainRepository.saveOrder({
        appid,
        timestamp,
        sign,
        orderNo,
        crypto,
        network,
        address,
        cryptoAmount,
        cryptoPrice,
        usdtAmount,
      });

      res.json(
        responseHandler(
          null,
          true,
          SUCCESS_CODE,
          "Order is successfully submitted!"
        )
      );
    } catch (err) {
      res.json(
        responseHandler(null, false, FAIL_CODE, "An internal error occured!")
      );
    }
  }
}

module.exports = MainController;
