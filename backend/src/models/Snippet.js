import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId, // stores user's _id
      ref: "User", // refers to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Snippet = mongoose.model("Snippet", snippetSchema);

export default Snippet;