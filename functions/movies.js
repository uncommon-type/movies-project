require("dotenv").config({
  path: `${__dirname}/.env`,
});

const fetch = require("node-fetch");

exports.handler = async ({ queryStringParameters }) => {
  const { searchTerm, searchType } = queryStringParameters;

  try {
    const parameter = searchType === "text" ? "s" : "i";
    const response = await fetch(
      `http://www.omdbapi.com/?${parameter}=${searchTerm}&apikey=${process.env.OMDB_API_KEY}`
    );
  } catch (error) {
    console.log(error);
  }
};
