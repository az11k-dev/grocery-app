import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./components/specific/Splash.jsx";
import Login from "./components/specific/Login.jsx";
import Welcome from "./components/specific/Welcome.jsx";
import Test from "./components/specific/Test.jsx";

function App() {
  const introSeen = localStorage.getItem("introShown") === "true";

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={introSeen ? <Welcome /> : <Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
