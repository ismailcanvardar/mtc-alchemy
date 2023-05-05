const { PaymentInfo } = require("../models");
const ethers = require("ethers");
const {
  HTTP_PROVIDER,
  TREASURY_PRIVATE_KEY,
  ALCHEMY_PAY_DOMAIN,
} = require("../constants");
const axios = require("axios");
const logger = require("../utils/logger");

async function sendFundsAndCompleteOrder() {
  const [foundOrder] = await PaymentInfo.find(
    { status: 2 },
    null,
    { limit: 1 }
  );

  const provider = new ethers.JsonRpcProvider(HTTP_PROVIDER);
  const wallet = new ethers.Wallet(TREASURY_PRIVATE_KEY, provider);

  if (!foundOrder) {
    // console.log("No order found!");
    return;
  }

  const {
    orderNo,
    crypto,
    network,
    address,
    cryptoAmount,
    cryptoPrice,
    usdtAmount,
    appid,
    timestamp,
    sign,
  } = foundOrder;

  try {
    const nonce = await wallet.getNonce();

    const tx = {
      from: wallet.address,
      to: address,
      value: ethers.parseUnits(cryptoAmount, "ether"),
      nonce,
    };

    const sentTx = await wallet.sendTransaction(tx);
    const receipt = await sentTx.wait();

    const response = {
      orderNo,
      crypto,
      cryptoAmount,
      cryptoPrice,
      txHash: sentTx.hash,
      network,
      networkFee: sentTx.gasPrice.toString(),
      address,
      status: receipt.status === 1 ? "SUCCESS" : "FAIL",
    };

    const { data } = await axios.default.post(
      `${ALCHEMY_PAY_DOMAIN}/webhooks/treasure`,
      { ...response },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          appId: appid,
          timestamp: timestamp,
          sign: sign,
        },
      }
    );

    // console.log(data);

    await PaymentInfo.updateOne(
      { orderNo },
      { status: receipt.status === 1 ? 1 : 0 }
    );
  } catch (err) {
    await PaymentInfo.updateOne({ orderNo }, { status: 3 });
    // console.log(err);
    logger.error(err);
  }
}

module.exports = sendFundsAndCompleteOrder;
