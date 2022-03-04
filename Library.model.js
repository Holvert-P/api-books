const mongoose = require("mongoose");
const { Schema } = mongoose;

const LibrarySchema = new Schema(
  {
    id: String,
    auth: String,
    title: String,
    edition: String,
  },
  { timestamps: true }
);

const LibraryModel = mongoose.model("books", LibrarySchema);

module.exports = LibraryModel;
