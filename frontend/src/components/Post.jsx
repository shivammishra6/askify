import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useQuestionStore } from "../store/question";

const Post = ({ question }) => {
  const { updateQuestion } = useQuestionStore();

  const [likes, setLikes] = useState(question.likes);
  const [dislikes, setDislikes] = useState(question.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

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
      <p className="text-[17px] font-bold">{question.question}</p>
      <div className="flex space-x-4 mt-2">
        <motion.button
          onClick={updateLikes}
          whileTap={{ scale: 0.8 }}
          className={`p-1 rounded-lg flex items-center space-x-2 transition-all ${
            liked ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          onClick={updateDislikes}
          whileTap={{ scale: 0.8 }}
          className={`p-1 rounded-lg flex items-center space-x-2 transition-all ${
            disliked ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{dislikes}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Post;
