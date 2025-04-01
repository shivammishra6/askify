import React, { useEffect } from "react";
import Post from "../components/Post";
import { useUser } from "@clerk/clerk-react";
import { useQuestionStore } from "../store/question";
import { AlertCircle } from "lucide-react";

const Activity = () => {
  const { user } = useUser();
  const { fetchUserQuestions, questions } = useQuestionStore();

  useEffect(() => {
    fetchUserQuestions(user.id);
  }, [fetchUserQuestions]);

  return (
    <div className="flex justify-center p-12">
      <div className="min-h-screen w-[525px]">
        <p className="text-[28px] m-3 my-8 font-bold">Your questions</p>
        <div className="flex flex-col gap-4 m-3">
          {questions
            .slice()
            .reverse()
            .map((question) => (
              <Post key={question._id} question={question} />
            ))}
          
          {questions.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-600">
            <AlertCircle size={48} className="text-red-500 mb-2" />
            <p className="text-lg font-semibold">
              No questions found, click the + icon to ask question!
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
