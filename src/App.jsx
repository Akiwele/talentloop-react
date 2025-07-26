import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ExplorePage from "./pages/ExplorePage"; // ✅ Make sure this is added

const routeTitles = {
  "/": "TalentLoop",
  "/signin": "Sign In | TalentLoop",
};

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = routeTitles[location.pathname] || "TalentLoop";
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="ExplorePage" element={<ExplorePage />} /> {/* 👈 Make sure this renders something */}
    </Routes>
  );
}

export default App;
