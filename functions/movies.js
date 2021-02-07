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
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Search || []),
    };
  } catch (error) {
    console.log(error);
  }
};
