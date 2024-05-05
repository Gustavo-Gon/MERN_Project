const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hike: { type: mongoose.Schema.Types.ObjectId, ref: 'Hike' },
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
