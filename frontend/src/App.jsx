import Feed from "./components/Feed";
import { Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import CreatePage from "./pages/CreatePage";
import { Link } from "react-router-dom"; // Correct import
import Comments from "./pages/Comments";

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
        <Link to="/create" className="btn">
          Create
        </Link>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/comments" element={<Comments/>}/>
        </Routes>
      </SignedIn>
    </>
  );
}

export default App;
