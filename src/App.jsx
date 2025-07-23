import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeTitles = {
  "/": "TalentLoop",
};

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = routeTitles[location.pathname] || "TalentLoop";
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
