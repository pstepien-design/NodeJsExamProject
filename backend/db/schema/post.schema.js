import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  text: String,
  timestamp: Date,
  comments: [String],
  likes: [String],
  postedBy: String,
});

const Post = mongoose.model("Post", postSchema);

export default Post;
