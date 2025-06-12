import backIcon from "../../assets/icons/backIcon.png";
import Women from "../../assets/images/beautiful-female.png";
import googleIcon from "../../assets/icons/googleIcon.png";
import personIcon from "../../assets/icons/personIcon.png";
function Welcome() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${Women})` }}
        className={`h-[100vh] bg-center bg-cover`}
      >
        <header className="relative flex items-center pt-16 px-4">
          <button>
            <img src={backIcon} alt="" className="w-[23px] h-[16px]" />
          </button>
          <p className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-normal text-white">
            Welcome
          </p>
        </header>
        <div className={`bg-sbg mt-[100%]`}>
          <div className="title">
            <h1>Welcome</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloribus dolorum tenetur quis
            </p>
          </div>
          <div className="btns flex flex-col items-center gap-y-4 p-2">
            <button className=" flex items-center gap-10 bg-white text-black font-bold p-4 px-7">
              <img src={googleIcon} className=" w-6" alt="google icon" />
              <a href="https://google.com">Continue with Google</a>
            </button>
            <button className=" flex items-center gap-10 bg-primary-dark text-white p-4 px-10">
              <img src={personIcon} className=" w-6" alt="person icon " />
              <a href="https://google.com">Create an account</a>
            </button>
          </div>
          <div className="login flex items-center gap-x-4">
            <p>Already have an account ?</p>
            <a href="">Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
