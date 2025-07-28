import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ExplorePage from "./pages/ExplorePage"; 
import Notifications from "./pages/Notifications";
import EditProfile from "./pages/EditProfile"; 

const routeTitles = {
  "/": "TalentLoop",
  "/signin": "SignIn | TalentLoop",
  "/signup": "SignUp | TalentLoop",
  "/explorepage": "ExplorePage | TalentLoop",
  "/notifications": "Notifications | TalentLoop",
  "/editprofile": "EditProfile | TalentLoop",
};

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = routeTitles[location.pathname] || "TalentLoop";
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/explorepage" element={<ExplorePage />} /> 
      <Route path="/notifications" element={<Notifications />} /> 
      <Route path="/editprofile" element={<EditProfile />} /> 
    </Routes>
  );
}

export default App;
