import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, MessageSquare, Trash, Pen } from "lucide-react";
import { useQuestionStore } from "../store/question";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Post = ({ question }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const { updateQuestion } = useQuestionStore();

  const [likes, setLikes] = useState(question.likes);
  const [dislikes, setDislikes] = useState(question.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const { deleteQuestion } = useQuestionStore();

  const handleDelete = async () => {
    const { success } = await deleteQuestion(question._id);
    if (!success) {
      console.log("not deleted");
    } else {
      console.log("deleted");
    }
  };

  const handleCommentClick = () => {
    navigate("/comments", { state: { questionId: question._id } });
  };

  const handleUpdate = () => {
    navigate("/update", { state: {question:question } });
  };

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    if (disliked) {
      setDislikes((prev) => prev - 1);
      setDisliked(false);
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    setDislikes((prev) => (disliked ? prev - 1 : prev + 1));
    if (liked) {
      setLikes((prev) => prev - 1);
      setLiked(false);
    }
    setDisliked(!disliked);
  };

  const updateLikes = async () => {
    handleLike();
    const updated = {
      ...question,
      likes: liked ? likes - 1 : likes + 1,
      dislikes: disliked ? dislikes - 1 : dislikes,
    };
    updateQuestion(question._id, updated);
  };

  const updateDislikes = async () => {
    handleDislike();
    const updated = {
      ...question,
      likes: liked ? likes - 1 : likes,
      dislikes: disliked ? dislikes - 1 : dislikes + 1,
    };
    updateQuestion(question._id, updated);
  };

  return (
    <div>
      <p className="text-[14px]">{question.username}</p>
      <p className="text-[18px] font-bold">{question.question}</p>
      <div className="flex space-x-3 mt-2">
        <motion.button
          onClick={updateLikes}
          whileTap={{ scale: 0.8 }}
          className={`py-1 px-2 rounded-lg flex items-center space-x-2 transition-all ${
            liked ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          onClick={updateDislikes}
          whileTap={{ scale: 0.8 }}
          className={`py-1 px-2 rounded-lg flex items-center space-x-2 transition-all ${
            disliked ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{dislikes}</span>
        </motion.button>

        <motion.button
          onClick={handleCommentClick}
          whileTap={{ scale: 0.8 }}
          className={`py-1 px-2 rounded-lg flex items-center space-x-2 transition-all bg-gray-200`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Answer</span>
        </motion.button>

        {question.userId === user.id && (
          <div>
          <motion.button className="text-[red]" onClick={handleDelete}>
            <Trash className="w-4 h-4" />
          </motion.button>
          <motion.button onClick={handleUpdate}>
            <Pen className="h-4 w-4"/>
          </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
