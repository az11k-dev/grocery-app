import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./components/specific/Splash.jsx";
import Login from "./components/specific/Login.jsx";
import Welcome from "./components/specific/Welcome.jsx";

function App() {
  const introSeen = localStorage.getItem("introShown") === "true";

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={introSeen ? <Welcome /> : <Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
