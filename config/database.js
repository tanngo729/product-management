const mongoose = require('mongoose');

// 3. Kết nối MongoDB
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect DB success");
  } catch (error) {
    console.log("Connect DB Error!");
  }
}
