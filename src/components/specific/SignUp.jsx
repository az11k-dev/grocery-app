import backIcon from "../../assets/icons/backIcon.png";
import Women from "../../assets/images/beautiful-female.png";
import emailIcon from "../../assets/icons/emailIcon.png";
import lockIcon from "../../assets/icons/lockIcon.png";
import eyeIcon from "../../assets/icons/eyeIcon.png";
import phoneIcon from "../../assets/icons/phoneIcon.png";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function SignUp() {
    const [pass, setPass] = useState(false);
    const navigate = useNavigate();
    const [enabled, setEnabled] = useState(false)

    const showPassword = () => {
        if (pass === false) {setPass(true)} else {setPass(false);}
    }

    return (
        <>
            <div
                style={{backgroundImage: `url(${Women})`}}
                className={`max-h-screen h-[100svh] bg-center bg-cover`}
            >
                <header className="relative flex items-center pt-16 px-4">
                    <button onClick={() => navigate("/welcome")}>
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
                    <div className="btns flex flex-col items-center gap-y-4 py-2">
                        <div
                            className="flex items-center justify-start gap-5 bg-fbg rounded-[5px] text-ftxt text-sm font-medium p-4 w-full">
                            <img src={emailIcon} className="w-[23px] h-[17.52px]" alt="google icon"/>
                            <input type={"email"} placeholder={"Email Address..."} className={"outline-none h-full"} />
                        </div>
                        <div
                            className="flex items-center justify-start gap-5 bg-fbg rounded-[5px] text-ftxt text-sm font-medium p-4 w-full">
                            <img src={phoneIcon} className="w-[23px] h-[23px]" alt="google icon"/>
                            <input type={"text"} placeholder={"Phone number..."} className={"outline-none h-full"} />
                        </div>
                        <div
                            className="flex items-center justify-between bg-fbg rounded-[5px] text-ftxt text-sm font-medium p-4 w-full">
                            <img src={lockIcon} className="w-[17.25px] h-[23px]" alt="google icon"/>
                            <input type={pass ? "password" : "text"} placeholder={"Password..."} className={"outline-none h-full"} />
                            <img src={eyeIcon} className={"w-[26.48px] h-[16.88px]"} onClick={() => {showPassword()}} alt="eyeIcon"/>
                        </div>
                    </div>
                    <button className={"bg-primary-dark w-full font-semibold text-sm py-5 rounded-[5px] text-sbg mt-3"}>
                        SignUp
                    </button>
                    <p className={"text-sm text-ftxt text-center font-normal mt-5"}>Already have an account ?
                        <span className={"text-stxt ml-1 text-center font-medium"} onClick={() => {navigate("/login")}} >Login</span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignUp;
