import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./components/specific/Splash.jsx";
import Login from "./components/specific/Login.jsx";

function App() {
    const introSeen = localStorage.getItem("introShown") === "true";

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={introSeen ? <Login/> : <Splash />} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App
