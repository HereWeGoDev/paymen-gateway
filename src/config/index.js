const dotenv = require("dotenv");

const envFile = dotenv.config({ path: "./src/config/.env" });

if (!envFile || envFile.error) {
  console.error("Environment File Error. ", envFile ? envFile.error : null);
}

module.exports = {
  port: process.env.PORT,
};
