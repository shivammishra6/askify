import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuestionStore } from "../store/question";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CreatePage = () => {
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize navigate
  const [newQuestion, setNewQuestion] = useState({
    username: user.fullName,
    userId:user.id,
    question: "",
    likes:0,
    dislikes: 0
  });

  const { createQuestion } = useQuestionStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted question:", newQuestion.question);
    console.log(newQuestion);
    
    const { success, message } = await createQuestion(newQuestion);
    
    console.log("Success:", success);
    console.log("Message:", message);

    if (success) {
      navigate("/"); // Redirect to homepage
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#2e2d2c] p-4">
      <div className="bg-black text-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Ask a Question
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="question"
              className="block text-gray-400 mb-1 font-medium"
            >
              Your Question
            </label>
            <input
              type="text"
              id="question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              placeholder="Type your question here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
