const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  source: {
    id: { type: String, default: null },
    name: { type: String },
  },
  author: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  urlToImage: { type: String },
  publishedAt: { type: Date },
  content: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);
