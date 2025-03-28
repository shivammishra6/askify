import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        required:true
    },
    dislikes:{
        type:Number,
        required:true
    },
    userId:{
      type:String,
      required:true
    }
})

const Question = mongoose.model('questions',questionSchema)
export default Question
