import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const Activity = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("User Data:", user);
    }
  }, [user]); // Log user data when it becomes available

  return (
    <div>
      <p>Your activity</p>
    </div>
  );
};

export default Activity;
