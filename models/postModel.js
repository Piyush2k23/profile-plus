import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    content: { 
        type: String, 
        required: true 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post =  mongoose.model("Post", postSchema);

export default Post;