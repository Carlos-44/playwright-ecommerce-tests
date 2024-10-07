const dotenv = require("dotenv");
const axios = require("axios");

module.exports = async () => {
  // Load environment variables from .env file
  dotenv.config();
  
  console.log("Checking if server is running on localhost:2221...");
  try {
    const response = await axios.get("http://localhost:2221");
    if (response.status === 200) {
      console.log("Server is up and running");
    }
  } catch (error) {
    console.error("Server is not running. Please ensure the server is running before tests.");
    throw new Error("Server not running on localhost:2221");
  }
};
