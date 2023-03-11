const mongoose = require("mongoose");

// Creating a Question schema
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      // option array to store options
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Option",
        },
        title: String,
        votes: Number,
        link_to_vote: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// mongoose model for Question Schema
const Question = mongoose.model("Question", questionSchema);

module.exports = Question; // exporting to use in another modules too
