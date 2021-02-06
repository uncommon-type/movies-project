require("dotenv").config({
  path: `${__dirname}/.env`,
});

const fetch = require("node-fetch");

exports.handler = async ({ queryStringParameters }) => {
  const { searchTerm, searchType } = queryStringParameters;

  return {
    statusCode: 200,
    body: "",
  };
};
