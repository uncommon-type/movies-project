require("dotenv").config({
  path: `${__dirname}/.env`,
});

const fetch = require("node-fetch");

exports.handler = async () => {
  return {
    statusCode: 200,
    body: "",
  };
};
