const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
      date: Date,
      user: String
    }
  );
  
  module.exports = mongoose.model("permission", schema);