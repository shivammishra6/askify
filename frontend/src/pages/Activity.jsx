import React, { useEffect } from "react";
import Post from "../components/Post";
import { useUser } from "@clerk/clerk-react";
import { useQuestionStore } from "../store/question";

const Activity = () => {
  const { user } = useUser();
  const { fetchUserQuestions, questions } = useQuestionStore();

  useEffect(() => {
    fetchUserQuestions(user.id);
  }, [fetchUserQuestions]);

  return (
    <div className="min-h-screen">
      <p className="text-[25px] m-3 mb-8">Your questions</p>
      <div className="flex flex-col gap-4 m-3">
        {questions
          .slice()
          .reverse()
          .map((question) => (
            <Post key={question._id} question={question} />
          ))}
      </div>
    </div>
  );
};

export default Activity;
