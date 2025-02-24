import Question from "../models/question.model.js";
import Comment from "../models/comment.model.js";
import mongoose from "mongoose";

export const getQuestions = async (_, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.log("Error in get questions: ", error.message);
    res
      .status(200)
      .json({ success: false, message: "questions couldn't be fetched" });
  }
};

export const createQuestion = async (req, res) => {
  const question = req.body;

  if (
    !question.username ||
    !question.question ||
    question.likes === undefined ||
    question.dislikes === undefined ||
    !question.userId
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newQuestion = new Question(question);

  try {
    await newQuestion.save();
    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    console.log("Error in creating question: ", error.message);
    res.status(200).json({ success: false, message: "question not created" });
  }
};

export const createComment = async (req, res) => {
  const comment = req.body;

  if (!comment.username || !comment.qid || !comment.comment) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newComment = new Comment(comment);

  try {
    await newComment.save();
    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    console.log("Error in creating comment: ", error.message);
    res.status(200).json({ success: false, message: "comment not created" });
  }
};

export const updateLikes = async (req, res) => {
  const { id } = req.params;
  const question = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "invalid id" });
  }

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, question, {
      new: true,
    });
    res.status(201).json({ success: true, data: updatedQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: "couldn't update likes" });
  }
};

export const getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ qid: id });
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.log("Error in get comments: ", error.message);
    res
      .status(200)
      .json({ success: false, message: "comments couldn't be fetched" });
  }
};

export const getUserQuestions=async(req,res)=>{
  const {id} = req.params;
  try {
    const questions = await Question.find({userId:id});
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.log("Error in get questions: ", error.message);
    res
      .status(200)
      .json({ success: false, message: "questions couldn't be fetched" });
  }
}

export const deleteQuestion=async(req,res)=>{
  const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({ success:false, message:"invalid id"})
    }

    try {
      await Question.findByIdAndDelete(id);
      res.status(200).json({success:true, message:"question deleted"})
    } catch (error) {
      console.log("Error in delete question: ",error.message);
      res.status(500).json({success:false, message:"question not found"})
    }
}