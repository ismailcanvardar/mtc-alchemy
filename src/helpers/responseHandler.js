const { FAIL_CODE } = require("../constants");

function responseHandler(
  data = null,
  success = false,
  returnCode = FAIL_CODE,
  returnMsg = ""
) {
  return {
    data,
    success,
    returnCode,
    returnMsg,
  };
}

module.exports = responseHandler;
