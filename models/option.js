const mongoose = require("mongoose");
const optionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    link_to_vote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const { APP_URL } = process.env;

optionSchema.pre("save", function (next) {
  if (!this.link_to_vote) {
    this.link_to_vote = `${APP_URL}/api/v1/options/${this._id}/add_vote`;
  }
  next();
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
