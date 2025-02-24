import Feed from "./components/Feed";
import { Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import CreatePage from "./pages/CreatePage";
import { Link } from "react-router-dom"; // Correct import
import Comments from "./pages/Comments";
import Activity from "./pages/Activity";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Link to="/create" >
          Create
        </Link>
        <Link to="/activity">Your activity</Link>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/update" element={<Update/>} />
          <Route path="/activity" element={<Activity/>} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </SignedIn>
    </>
  );
}

export default App;
