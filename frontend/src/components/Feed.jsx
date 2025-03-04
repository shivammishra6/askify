import React, { useEffect } from "react";
import Post from "./Post";
import { useQuestionStore } from "../store/question";

const Feed = () => {
  const { fetchQuestions, questions } = useQuestionStore();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="flex flex-col max-w-[600px] m-4 mt-8">
      {questions
        .slice()
        .reverse()
        .map((question) => (
          <Post key={question._id} question={question} />
        ))}
    </div>
  );
};

export default Feed;
