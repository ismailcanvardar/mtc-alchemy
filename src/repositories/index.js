const networkList = require("../data/network-list");
const { PaymentInfo } = require("../models");
const { MTC_PRICE } = require("../constants");

class MainRepository {
  getPrice() {
    return MTC_PRICE;
  }

  getNetworkList() {
    return networkList;
  }

  async getOrderFromNumber(orderNo) {
    try {
      const data = await PaymentInfo.findOne({
        orderNo
      });

      return data;
    } catch(err) {
      throw new Error(err);
    }
  }

  async saveOrder(args) {
    try { 
      const newPaymentInfo = new PaymentInfo({...args});

      await newPaymentInfo.save();

      return true;
    } catch(err) {
      throw new Error(err);
    }
  }
}

module.exports = MainRepository;
