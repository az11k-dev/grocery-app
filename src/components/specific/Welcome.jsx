import backIcon from "../../assets/icons/backIcon.png";
import Women from "../../assets/images/beautiful-female.png";
import googleIcon from "../../assets/icons/googleIcon.png";
import personIcon from "../../assets/icons/personIcon.png";

function Welcome() {
    return (
        <>
            <div
                style={{backgroundImage: `url(${Women})`}}
                className={`max-h-screen h-[100svh] bg-center bg-cover`}
            >
                <header className="relative flex items-center pt-16 px-4">
                    <button>
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
                        <a href="https://google.com"
                           className="flex items-center justify-center gap-10 bg-fbg rounded-[5px] text-stxt text-sm font-medium p-4 w-full">
                            <img src={googleIcon} className=" w-6" alt="google icon"/>
                            Continue with Google
                        </a>
                        <a href="https://google.com"
                           className="flex justify-center w-full items-center gap-10 bg-primary-dark text-white p-4 text-sm font-medium px-10 rounded-[5px]">
                            <img src={personIcon} className=" w-6" alt="person icon "/>
                            Create an account
                        </a>
                    </div>
                    <p className={"text-sm text-ftxt text-center font-normal mt-2"}>Already have an account ?
                        <a className={"text-stxt ml-1 text-center font-medium"} href="/login">Login</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Welcome;
