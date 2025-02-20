import React, { useEffect } from "react";
import Post from "./Post";
import { useQuestionStore } from "../store/question";

const Feed = () => {
  const { fetchQuestions, questions } = useQuestionStore();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="flex flex-col gap-8 m-3">
      {questions.map((question) => (
        <Post key={question._id} question={question} />
      ))}
    </div>
  );
};

export default Feed;
