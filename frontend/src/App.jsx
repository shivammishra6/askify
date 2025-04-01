import Feed from "./components/Feed";
import { Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import CreatePage from "./pages/CreatePage";
import { Link } from "react-router-dom"; // Correct import
import Comments from "./pages/Comments";
import Activity from "./pages/Activity";
import Update from "./pages/Update";
import { Plus, MessageCircleQuestion } from "lucide-react";

function App() {
  return (
    <div className="bg-black text-white">
      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="w-full border-b border-solid border-black-200 fixed bg-black">
          <div className="flex justify-between max-w-[1200px] m-auto p-3 ">
            <div className="flex gap-4">
              <Link to="/">
                <img src="logo.png" className="w-7 h-7" alt="askify" />
              </Link>
              <Link to="/">
                <p className="font-bold text-[#018dc8] text-xl">askify</p>
              </Link>
            </div>
            <div className="flex gap-4">
              <Link to="/create">
                <Plus />
              </Link>
              <Link to="/activity">
                <MessageCircleQuestion />
              </Link>
              <UserButton />
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/update" element={<Update />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </SignedIn>
    </div>
  );
}

export default App;
