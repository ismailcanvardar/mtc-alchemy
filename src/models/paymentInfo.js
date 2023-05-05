const mongoose = require("mongoose");

const paymentInfoSchema = new mongoose.Schema(
  {
    appid: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    sign: {
      type: String,
      required: true
    },
    orderNo: {
      type: String,
      required: true,
    },
    crypto: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cryptoAmount: {
      type: String,
      required: true,
    },
    cryptoPrice: {
      type: String,
      required: true,
    },
    usdtAmount: {
      type: String,
      required: true,
    },
    /**
     * 0 -> Failed, 1 -> Success, 2 -> Pending, 3 -> Internal Error
     */
    status: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentInfo", paymentInfoSchema);
