import { databaseURL } from "./index";
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${databaseURL}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
