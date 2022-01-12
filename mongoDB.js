import mongoose from "mongoose";

export const connectWithDataBase = (params) => {
  mongoose.connect(process.env.MONGODBURL, () => {
    console.log("connected to mongoDB Database");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
