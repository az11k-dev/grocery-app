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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
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
        const {error, data} = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            notify(`Error: ${error.message}`, "error")
        } else {
            notify("Письмо для подтверждения отправлено на email", "success")
            await supabase.from('profiles').insert({
                id: data.user.id,
                email: email,
                password: password,
                fullName: fullName,
            });
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={22}
                                height={22}
                                fill="none"
                            >
                                <g clipPath="url(#a)">
                                    <path
                                        fill={"#868889"}
                                        d="M18.778 3.222A10.928 10.928 0 0 0 11 0C8.062 0 5.3 1.144 3.222 3.222A10.928 10.928 0 0 0 0 11c0 2.938 1.144 5.7 3.222 7.778A10.928 10.928 0 0 0 11 22c2.938 0 5.7-1.144 7.778-3.222A10.928 10.928 0 0 0 22 11c0-2.938-1.144-5.7-3.222-7.778ZM5.515 19.009A5.554 5.554 0 0 1 11 14.406a5.554 5.554 0 0 1 5.485 4.603A9.656 9.656 0 0 1 11 20.71a9.656 9.656 0 0 1-5.485-1.702Zm1.987-9.39A3.501 3.501 0 0 1 11 6.122a3.502 3.502 0 0 1 3.498 3.497A3.502 3.502 0 0 1 11 13.117a3.502 3.502 0 0 1-3.498-3.498Zm10.1 8.496a6.85 6.85 0 0 0-2.002-3.226 6.851 6.851 0 0 0-1.992-1.258 4.786 4.786 0 0 0 2.179-4.012A4.792 4.792 0 0 0 11 4.833a4.792 4.792 0 0 0-4.787 4.786c0 1.678.868 3.157 2.179 4.012-.725.298-1.4.721-1.992 1.258a6.853 6.853 0 0 0-2.002 3.226A9.686 9.686 0 0 1 1.29 11c0-5.355 4.356-9.71 9.711-9.71s9.71 4.355 9.71 9.71a9.687 9.687 0 0 1-3.108 7.115Z"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path fill={"#868889"} d="M0 0h22v22H0z" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <input type={"text"} value={fullName}
                                   onChange={(e) => setFullName(e.target.value)}
                                   required placeholder={"Full Name..."} className={"outline-none h-full"}/>
                        </div>
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
