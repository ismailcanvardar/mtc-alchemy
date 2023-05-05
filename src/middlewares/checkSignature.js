const sha1 = require("js-sha1");
const { APP_SECRET, FAIL_CODE, ORDER_EXPIRATION } = require("../constants");
const { responseHandler } = require("../helpers");
const moment = require("moment");

function getMerSign(appid, appSecret, timestamp) {
  return sha1(appid + appSecret + String(timestamp));
}

function checkSignature(req, res, next) {
  const { appid, timestamp, sign } = req.headers;

  // console.log(moment().utc().valueOf());
  // console.log(getMerSign("1", APP_SECRET, moment().utc().valueOf()));

  if (!appid || !timestamp || !sign) {
    return res.json(
      responseHandler(null, false, FAIL_CODE, "Header values are missing!")
    );
  }

  const generatedSign = getMerSign(appid, APP_SECRET, timestamp);

  if (generatedSign !== sign) {
    return res.json(
      responseHandler(null, false, FAIL_CODE, "Provided signature is mismatched!")
    );
  }

  const timeDifference = moment.duration(moment().utc().diff(moment(Number(timestamp)))).asMinutes();
  // console.log(timeDifference);
  // if (timeDifference > ORDER_EXPIRATION) {
  //   return res.json(
  //     responseHandler(null, false, FAIL_CODE, "Order is expired!")
  //   );
  // }

  next();
}

module.exports = checkSignature;
