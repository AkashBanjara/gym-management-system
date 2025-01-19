const mongoose = require("mongoose");

module.exports = async () => {
  const mongoUrI = process.env.MONGODB_URI
  try {
    await mongoose.connect(mongoUrI);
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
