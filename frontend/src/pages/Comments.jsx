import React, { useEffect } from "react";
import { useCommentStore, useQuestionStore } from "../store/question";
import { useLocation } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const Comments = () => {
  const location = useLocation();
  const { questionId } = location.state || {};
  const { fetchQuestions, questions } = useQuestionStore();
  const { fetchComments, comments } = useCommentStore();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    fetchComments(questionId);
  }, [fetchComments]);

  return (
    <div>
      {questions
        .filter((question) => question._id === questionId) // Replace targetId with the desired ID
        .map((question) => (
          <div key={question._id}>
            <p>{question.username}</p>
            <p>{question.question}</p>
          </div>
        ))}

      <input
        type="text"
        placeholder="Write your answer..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />

      <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
        Answer
      </button>

      {comments
        .slice()
        .reverse()
        .map((comment) => (
          <div key={comment._id}>
            <p className="text-[14px]">{comment.username}</p>
            <p className="text-[18px] font-bold">{comment.comment}</p>
          </div>
        ))}

      {comments.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-600">
          <AlertCircle size={48} className="text-red-500 mb-2" />
          <p className="text-lg font-semibold">
            No answers found, be the first to answer!
          </p>
        </div>
      )}
    </div>
  );
};

export default Comments;
