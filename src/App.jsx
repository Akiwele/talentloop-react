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
  "/SignIn": "SignIn | TalentLoop",
  "/SignUp": "SignUp | TalentLoop",
  "/ExplorePage": "ExplorePage | TalentLoop",
  "/Notifications": "Notifications | TalentLoop",
  "/EditProfile": "EditProfile | TalentLoop",
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
      <Route path="/ExplorePage" element={<ExplorePage />} /> 
      <Route path="/Notifications" element={<Notifications />} /> 
      <Route path="/EditProfile" element={<EditProfile />} /> 

    </Routes>
  );
}

export default App;
