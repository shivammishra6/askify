import React, { useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { useQuestionStore } from "../store/question";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state || {};
  const [updatedQuestion, setUpdatedQuestion] = useState(question);

  const {updateQuestion}=useQuestionStore()

  const handleUpdate = async() => {
    updateQuestion(updatedQuestion._id,updatedQuestion)
    navigate("/")
  };

  return (
    <div>
      <p>Update question</p>
      <input
        type="text"
        value={updatedQuestion.question}
        onChange={(e) => setUpdatedQuestion({...updatedQuestion,question:e.target.value})}
      />
      <button onClick={handleUpdate}>Submit</button>
    </div>
  );
};

export default Update;
