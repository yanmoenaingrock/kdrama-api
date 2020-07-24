const mongoose = require("mongoose");

const dramaSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "A dramas show must have a title."],
    unique: [
      true,
      "Drama name already exists. Try adding extra infomation to the same title, such as year",
    ],
    trim: true,
  },

  director: {
    type: String,
    required: [true, "A dramas show must have a director"],
    trim: true,
  },

  leadActor: {
    type: String,
    required: [true, "A dramas show must have a lead actor"],
    trim: true,
  },

  leadActress: {
    type: String,
    required: [true, "A dramas show must have a lead actress"],
    trim: true,
  },
  noepisodes: Number,
  releasedYear: {
    type: Date,
    required: [true, "A drama show must have released year"],
  },
  firstReleasedDate: Date,
  finalReleasedDate: Date,

  countryOfOrigin: {
    type: String,
    required: [true, "Provide the original country of the drama"],
    trim: true,
  },
});

const Drama = mongoose.model("Drama", dramaSchema);

module.exports = Drama;
