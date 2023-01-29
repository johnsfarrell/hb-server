const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  title: { type: String, required: true },
  story: { type: String, required: true },
  views: { type: Number, required: true },
  id: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("StorySchema", storySchema);
