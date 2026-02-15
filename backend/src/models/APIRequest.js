import mongoose from "mongoose";

const reqSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // stores user's _id
      ref: "User", // refers to the User model
      required: true,
    },

    name: {
        type: String,
        required: true
    },

    method: {
        type: String,
        enum: ["GET", "POST", "PUT", "DELETE"],
        required: true
    },

    url: {
        type: String,
        required: true
    },

    headers: {
        type: Object,
        default: {}
    },

    body: {
        type: Object,
        default: {}
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", reqSchema);

export default Request;
