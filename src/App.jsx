import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ExplorePage from "./pages/ExplorePage"; 
import Notifications from "./pages/Notifications";
import EditProfile from "./pages/EditProfile"; // ✅ import it



const routeTitles = {
  "/": "TalentLoop",
  "/signin": "SignIn | TalentLoop",
   "/signup": "SignUp | TalentLoop",
  "/notifications": "Notifications | TalentLoop",
  "/EditProfile": "EditPtofile | Talentloop",
};

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = routeTitles[location.pathname.toLowerCase()] || "TalentLoop";
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/ExplorePage" element={<ExplorePage />} /> 
      <Route path="/Notifications" element={<Notifications />} /> {/* ✅ Fixed */}
      <Route path="/EditProfile" element={<EditProfile />} /> // ✅ add this

    </Routes>
  );
}

export default App;
