import React, { useEffect, useState } from "react";
import { useCommentStore, useQuestionStore } from "../store/question";
import { useLocation } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Comments = () => {
  const { user } = useUser();
  const location = useLocation();
  const { questionId } = location.state || {};
  const { fetchQuestions, questions } = useQuestionStore();
  const { fetchComments, comments } = useCommentStore();
  const [submitted, setSubmitted] = useState(false);
  const {createComment}=useCommentStore()

  const [newComment, setNewComment] = useState({
    qid: questionId,
    username: user.fullName,
    comment: "",
    userId:user.id
  });

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    fetchComments(newComment.qid);
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Trigger validation
  
    if (!newComment.comment.trim()) return; // Prevent empty submissions
  
    const { success, message } = await createComment(newComment);
  
    console.log("Success:", success);
    console.log("Message:", message);
  
    if (success) {
      setNewComment({ ...newComment, comment: "" });
      setSubmitted(false); // Reset validation after successful submission
    }
  };
  

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
        value={newComment.comment}
        onChange={(e) =>
          setNewComment({ ...newComment, comment: e.target.value })
        }
        placeholder="Write your answer..."
        className={`w-full px-4 py-2 border ${
          submitted && !newComment.comment
            ? "border-red-500"
            : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
      />
      {submitted && !newComment.comment && (
        <p className="text-red-500 text-sm mt-1">Answer cannot be empty.</p>
      )}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
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
