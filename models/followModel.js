import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", followSchema);

export default Follow;