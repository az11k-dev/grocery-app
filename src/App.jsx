import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Splash from "./components/specific/Splash.jsx";
import Login from "./components/specific/Login.jsx";
import Welcome from "./components/specific/Welcome.jsx";
import SignUp from "./components/specific/SignUp.jsx";
import Home from "./pages/Home.jsx";
import RequireAuth from "./lib/requireAuth"
import Test from "./Test.jsx";
import Cart from "./components/specific/Cart.jsx";
import NotFound from "./components/specific/NotFound.jsx";
import ProductDetails from "./components/specific/ProductDetails.jsx";
import Categories from "./components/specific/Categories.jsx";
import SingleCategory from "./components/specific/SingleCategory.jsx";
import ProductFilter from "./components/specific/ProductFilter.jsx";
import Profile from "./components/specific/Profile.jsx";

function App() {
    const introSeen = localStorage.getItem("introShown") === "true";

    return (
        <div className={"bg-sbg min-h-screen"}>
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
                    <Route path="/login" element={
                        <Login/>
                    }/>
                    <Route path="/welcome" element={
                        <Welcome/>
                    }/>
                    <Route path="/splash" element={
                        <Splash/>
                    }/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                    <Route path={"/test"} element={<Test/>}/>
                    <Route path={"/cart"} element={
                        <RequireAuth>
                            <Cart/>
                        </RequireAuth>
                    }/>
                    <Route path={"/product/:id"} element={
                        <RequireAuth>
                            <ProductDetails/>
                        </RequireAuth>}/>
                    <Route path={"/categories"} element={
                        <RequireAuth>
                            <Categories/>
                        </RequireAuth>
                    }/>
                    <Route path={"/category/:categoryName"} element={
                        <RequireAuth>
                            <SingleCategory/>
                        </RequireAuth>}/>
                    <Route path={"/filter"} element={
                        <RequireAuth>
                            <ProductFilter/>
                        </RequireAuth>}/>
                    <Route path={"/profile"} element={
                        <RequireAuth>
                            <Profile/>
                        </RequireAuth>}/>
                    <Route path={"*"} element={<NotFound />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
