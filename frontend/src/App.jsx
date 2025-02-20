import Feed from "./components/Feed";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";

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
        <Feed />
      </SignedIn>
    </>
  );
}

export default App;
