import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  qid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }
});

const Comment=mongoose.model('comments',commentSchema)
export default Comment