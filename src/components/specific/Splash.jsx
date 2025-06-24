import { useState } from "react";
import fSplash from "../../assets/images/fsplash.png";
import sSplash from "../../assets/images/ssplash.png";
import tSplash from "../../assets/images/tsplash.png";
import { COLORS } from "../../theme/colors.jsx";
import {useNavigate} from "react-router-dom";

const splashData = [
    {
        id: 1,
        img: fSplash,
        title: "Buy Grocery",
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr amet diam nonumy.",
    },
    {
        id: 2,
        img: sSplash,
        title: "Fast Delivery",
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy",
    },
    {
        id: 3,
        img: tSplash,
        title: "Enjoy Quality Food",
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy",
    },
];

function Splash() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    const handleNext = () => {
        if (currentIndex < splashData.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            localStorage.setItem('introShown', 'true');
            navigate("/welcome");
            window.scrollTo({ top: 0});
        }
    };

    const handleSkip = () => {
        console.log("Splash skipped");
        localStorage.setItem('introShown', 'true');
        navigate("/welcome");
    };

    const currentItem = splashData[currentIndex];

    return (
        <div className="pt-32 h-[100svh] w-screen bg-white">
            <div className="flex items-center justify-center">
                <img src={currentItem.img} alt="splash" />
            </div>
            <div className="mt-20">
                <h1 className={`text-[${COLORS.stxt}] font-bold text-2xl text-center`}>
                    {currentItem.title}
                </h1>
                <p className="text-ftxt font-medium text-sm text-center mt-2 px-10">
                    {currentItem.text}
                </p>
            </div>
            <div className="flex items-center justify-between px-10 mt-16">
                <button onClick={handleSkip} className="text-[#C4C4C4] text-[15px] font-medium">
                    Skip
                </button>

                <div className="flex items-center justify-center gap-1">
                    {splashData.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary-dark scale-125' : 'bg-[#DCDCDC]'}`}
                        />
                    ))}
                </div>

                <button onClick={handleNext} className="text-primary-dark text-[15px] font-medium">
                    {currentIndex === splashData.length - 1 ? "Done" : "Next"}
                </button>
            </div>
        </div>
    );
}

export default Splash;
