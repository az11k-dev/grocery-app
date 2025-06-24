import backIcon from "../../assets/icons/backIcon.png";
import Women from "../../assets/images/beautiful-female.png";
import emailIcon from "../../assets/icons/emailIcon.png";
import lockIcon from "../../assets/icons/lockIcon.png";
import eyeIcon from "../../assets/icons/eyeIcon.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from '../../lib/supabaseClient'
import {useNotification} from "../../context/NotificationProvider.jsx";
import UButton from "../common/UButton.jsx";

function SignUp() {
    const [pass, setPass] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { notify } = useNotification();

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

    const showPassword = () => {
        if (pass === false) {
            setPass(true)
        } else {
            setPass(false);
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        const {error} = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            notify(`Error: ${error.message}`, "error")
        } else {
            notify("Письмо для подтверждения отправлено на email", "success")
            navigate("/login");
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
                        navigate("/welcome");
                        window.scrollTo({ top: 0});
                    }}>
                        <img src={backIcon} alt="image" className="w-[23px] h-[16px]"/>
                    </button>
                    <p className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-normal text-white">
                        Welcome
                    </p>
                </header>
                <div className={`bg-sbg absolute bottom-0 px-5 py-10 rounded-t-[10px] w-full`}>
                    <div className="title">
                        <h1 className={"text-2xl font-semibold text-stxt"}>Create account</h1>
                        <p className={"text-ftxt text-sm font-normal my-2"}>
                            Quickly create account
                        </p>
                    </div>
                    <form onSubmit={handleSignup} className="btns flex flex-col items-center gap-y-4 py-2">
                        <div
                            className="flex items-center justify-start gap-5 bg-fbg rounded-[5px] text-ftxt text-sm font-medium p-4 w-full">
                            <img src={emailIcon} className="w-[23px] h-[17.52px]" alt="google icon"/>
                            <input type={"email"} value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required placeholder={"Email Address..."} className={"outline-none h-full"}/>
                        </div>
                        <div
                            className="flex items-center justify-between bg-fbg rounded-[5px] text-ftxt text-sm font-medium p-4 w-full">
                            <img src={lockIcon} className="w-[17.25px] h-[23px] mr-5" alt="google icon"/>
                            <input type={pass ? "text" : "password"} value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required placeholder={"Password..."}
                                   className={"outline-none h-full"}/>
                            <img src={eyeIcon} className={"w-[26.48px] h-[16.88px]"} onClick={() => {
                                showPassword()
                            }} alt="eyeIcon"/>
                        </div>
                        <UButton type={"submit"} text={"Sign up"} />
                    </form>
                    <p className={"text-sm text-ftxt text-center font-normal mt-5"}>Already have an account ?
                        <span className={"text-stxt ml-1 text-center font-medium"} onClick={() => {
                            navigate("/login");
                            window.scrollTo({ top: 0});
                        }}>Login</span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignUp;
