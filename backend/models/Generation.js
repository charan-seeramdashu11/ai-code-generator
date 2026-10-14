const mongoose = require('mongoose');

const generationSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true
    },
    language: {
      type: String,
      required: true,
      default: 'javascript'
    },
    generatedCode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Generation', generationSchema);
