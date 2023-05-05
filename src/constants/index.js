const SUCCESS_CODE = "0000";
const FAIL_CODE = "9999";
const MTC_PRICE = "0.07";
const ORDER_EXPIRATION = 5;

const PORT = process.env.PORT;
const APP_SECRET = process.env.APP_SECRET;
const ALCHEMY_PAY_DOMAIN = process.env.ALCHEMY_PAY_DOMAIN;
const MONGO_URI = process.env.MONGO_URI;
const CRON_EXPRESSION = process.env.CRON_EXPRESSION;
const TREASURY_PRIVATE_KEY = process.env.TREASURY_PRIVATE_KEY;
const HTTP_PROVIDER = process.env.HTTP_PROVIDER;

if (!PORT) {
  console.error("Server port is not provided!");
  process.exit(1);
}

if (!APP_SECRET) {
  console.error("App secret is not provided!");
  process.exit(1);
}

if (!MONGO_URI) {
  console.error("MongoDB connection uri is not provided!");
  process.exit(1);
}

if (!TREASURY_PRIVATE_KEY) {
  console.error("Treasury private key is not provided!");
  process.exit(1);
}

if (!HTTP_PROVIDER) {
  console.error("Http provider is not provided!");
  process.exit(1);
}

if (!ALCHEMY_PAY_DOMAIN) {
  console.error("Alchemy pay domain is not provided!");
  process.exit(1);
}

module.exports = {
  ALCHEMY_PAY_DOMAIN,
  APP_SECRET,
  FAIL_CODE,
  HTTP_PROVIDER,
  MONGO_URI,
  MTC_PRICE,
  ORDER_EXPIRATION,
  PORT,
  SUCCESS_CODE,
  TREASURY_PRIVATE_KEY,
};
