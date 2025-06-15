import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Splash from "./components/specific/Splash.jsx";
import Login from "./components/specific/Login.jsx";
import Welcome from "./components/specific/Welcome.jsx";
import SignUp from "./components/specific/SignUp.jsx";
import Home from "./pages/Home.jsx";
import RequireAuth from "./lib/requireAuth"

function App() {
    const introSeen = localStorage.getItem("introShown") === "true";

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={introSeen ? <Welcome/> : <Splash/>}/>
                    <Route
                        path="/home"
                        element={
                            <RequireAuth>
                                <Home/>
                            </RequireAuth>
                        }
                    />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/welcome" element={<Welcome/>}/>
                    <Route path="/splash" element={<Splash/>}/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
