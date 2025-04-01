import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuestionStore } from "../store/question";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state || {};
  const [updatedQuestion, setUpdatedQuestion] = useState(question);

  const { updateQuestion } = useQuestionStore();

  const handleUpdate = async () => {
    updateQuestion(updatedQuestion._id, updatedQuestion);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#2e2d2c] p-4">
      <div className="bg-black text-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Update Question
        </h2>
        <label
              htmlFor="question"
              className="block text-gray-400 mb-1 font-medium"
            >
              Your Question
            </label>  
        <input
          type="text"
          value={updatedQuestion.question}
          onChange={(e) =>
            setUpdatedQuestion({ ...updatedQuestion, question: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUpdate}
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Update;
