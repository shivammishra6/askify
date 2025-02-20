import Question from "../models/question.model.js";
import mongoose from "mongoose";

export const getQuestions = async (req, res) => {
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
