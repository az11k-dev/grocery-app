import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {supabase} from '../../lib/supabaseClient'
import backIcon from "../../assets/icons/backIcon.png";
import Women from "../../assets/images/beautiful-female.png";
import emailIcon from "../../assets/icons/emailIcon.png";
import lockIcon from "../../assets/icons/lockIcon.png";
import eyeIcon from "../../assets/icons/eyeIcon.png";
import {useNotification} from "./NotificationProvider.jsx";
import UButton from "../common/UButton.jsx";

function Login() {
    const [pass, setPass] = useState(false);
    const navigate = useNavigate();
    const [enabled, setEnabled] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { notify } = useNotification();

    const showPassword = () => {
        if (pass === false) {
            setPass(true)
        } else {
            setPass(false);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            notify(`Error: ${error}`, `error`);
        } else {
            notify("Успешно вошли!", "success");
            navigate("/home");
            window.scrollTo({ top: 0});
        }
    }

    return (
        <>
            <div
                style={{backgroundImage: `url(${Women})`}}
                className={`max-h-screen h-[100svh] bg-center bg-cover`}
            >
                <header className="relative flex items-center pt-16 px-4">
                    <button onClick={() => {
                        navigate("/signup");
                        window.scrollTo({ top: 0});
                    }}>
                        <img src={backIcon} alt="image" className="w-[23px] h-[16px]"/>
                    </button>
                    <p className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-normal text-white">
                        Welcome
                    </p>
                </header>
                <form onSubmit={handleLogin} className={`bg-sbg absolute bottom-0 px-5 py-10 rounded-t-[10px] w-full`}>
                    <div className="title">
                        <h1 className={"text-2xl font-semibold text-stxt"}>Welcome back !</h1>
                        <p className={"text-ftxt text-sm font-normal my-2"}>
                            Sign in to your account
                        </p>
                    </div>
                    <div className="btns flex flex-col items-center gap-y-4 py-2">
                        <div
                            className="flex items-center justify-start gap-5 bg-fbg rounded-[5px] text-ftxt text-sm font-medium p-4 w-full">
                            <img src={emailIcon} className="w-[23px] h-[17.52px]" alt="google icon"/>
                            <input type={"email"} placeholder={"Email Address..."} value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required className={"outline-none h-full"}/>
                        </div>
                        <div
                            className="flex items-center justify-between bg-fbg rounded-[5px] text-ftxt text-sm font-medium p-4 w-full">
                            <img src={lockIcon} className="w-[17.25px] h-[23px] mr-5" alt="google icon"/>
                            <input value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required type={pass ? "password" : "text"} placeholder={"Password..."}
                                   className={"outline-none h-full"}/>
                            <img src={eyeIcon} className={"w-[26.48px] h-[16.88px]"} onClick={() => {
                                showPassword()
                            }} alt="eyeIcon"/>
                        </div>
                    </div>
                    <div className={"flex justify-between items-center p-1 my-3"}>
                        <div className={"flex justify-start items-center gap-2"}>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={enabled}
                                    onChange={() => setEnabled(!enabled)}
                                />
                                <div
                                    className={`w-[29px] h-[16px] flex items-center rounded-full p-[2px] duration-300 ${enabled ? 'bg-primary-dark' : 'bg-gray-300'}`}>
                                    <div
                                        className={`bg-white w-[12px] h-[12px] rounded-full shadow-sm transform duration-300 ${enabled ? 'translate-x-[13px]' : 'translate-x-0'}`}
                                    ></div>
                                </div>
                            </label>
                            <p className={"text-ftxt"}>
                                Remember me
                            </p>
                        </div>
                        <p onClick={() => {
                            navigate("/forget")
                            window.scrollTo({ top: 0});
                        }} className={"text-link text-sm font-medium"}>
                            Forgot password
                        </p>
                    </div>
                    <UButton type={"submit"} text={"Login"} />
                    <p className={"text-sm text-ftxt text-center font-normal mt-5"}>Don’t have an account ?
                        <span className={"text-stxt ml-1 text-center font-medium"} onClick={() => {
                            navigate("/signup");
                            window.scrollTo({ top: 0});
                        }}>Sign up</span>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Login;
