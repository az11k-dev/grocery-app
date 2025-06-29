import backIcon from "../../assets/icons/backIcon.png";
import Women from "../../assets/images/beautiful-female.png";
import googleIcon from "../../assets/icons/googleIcon.png";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {supabase} from "../../lib/supabaseClient.js";
import UButton from "../common/UButton.jsx";

function Welcome() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                navigate("/home");
                window.scrollTo({ top: 0});
            }
        };
        checkSession();
    }, [navigate]);

    return (
        <>
            <div
                style={{backgroundImage: `url(${Women})`}}
                className={`max-h-screen h-[100svh] bg-center bg-cover`}
            >
                <header className="relative flex items-center pt-16 px-4">
                    <button onClick={() => {
                        navigate("/splash");
                        window.scrollTo({ top: 0});
                    }}>
                        <img src={backIcon} alt="image" className="w-[23px] h-[16px]"/>
                    </button>
                    <p className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-normal text-white">
                        Welcome
                    </p>
                </header>
                <div className={`bg-sbg absolute bottom-0 px-5 py-10 rounded-t-[10px]`}>
                    <div className="title">
                        <h1 className={"text-2xl font-semibold text-stxt"}>Welcome</h1>
                        <p className={"text-ftxt text-sm font-normal my-2"}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Doloribus dolorum tenetur quis
                        </p>
                    </div>
                    <div className="btns flex flex-col items-center gap-y-4 py-2">
                        <button onClick={() => {
                            supabase.auth.signInWithOAuth({ provider: 'google' });
                        }}
                           className="flex items-center justify-center gap-10 bg-fbg rounded-[5px] text-stxt text-sm font-medium p-4 w-full">
                            <img src={googleIcon} className=" w-6" alt="google icon"/>
                            Continue with Google
                        </button>
                        <UButton text={"Create an account"} onClick={() => {
                            navigate("/signup");
                            window.scrollTo({ top: 0});
                        }} />
                    </div>
                    <p className={"text-sm text-ftxt text-center font-normal mt-2"}>Already have an account ?
                        <span onClick={() => {navigate("/login"); window.scrollTo({ top: 0});}} className={"text-stxt ml-1 text-center font-medium"}>Login</span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Welcome;
