import { useEffect, useState } from "react";
import searchIcon from "../assets/icons/searchIcon.png";
import filterIcon from "../assets/icons/filterIcon.png";
import rightIcon from "../assets/icons/rightIcon.png";
import {supabase} from '../lib/supabaseClient'
import Loader from "../components/specific/Loader.jsx"

function Home() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [sliderImages, setSliderImages] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchSliderImages = async () => {
            const { data, error } = await supabase
                .storage
                .from('images')
                .list('slider', { limit: 100 });

            if (error) {
                console.error('Ошибка загрузки изображений:', error);
                return;
            }

            const imageFiles = data.filter(
                (file) =>
                    file.metadata?.size > 0
            );

            const urls = await Promise.all(
                imageFiles.map(async (file) => {
                    const { data: publicUrlData, error } = supabase
                        .storage
                        .from('images/slider')
                        .getPublicUrl(file.name);

                    if (error) {
                        console.error('Ошибка получения URL:', error);
                        return null;
                    }

                    return publicUrlData.publicUrl;
                })
            );

            setSliderImages(urls.filter(Boolean));

        };

        fetchSliderImages();
    }, []);

    useEffect(() => {
        if (sliderImages.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % sliderImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [sliderImages]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select("*")
            data ? setCategories(data) : console.log(error);
        }
        fetchCategories();
    }, [])

    return (
        <div className="p-5">
            <div className="w-full flex items-center justify-between bg-sbg p-5 rounded-[5px]">
                <img className="w-5 h-5" src={searchIcon} alt="search" />
                <input
                    className="w-[80%] outline-none h-full text-sm text-ftxt font-medium bg-transparent"
                    placeholder="Search keywords..."
                    type="text"
                />
                <img className="w-5 h-5" src={filterIcon} alt="filter" />
            </div>

            {sliderImages.length > 0 ? (<div className="mt-5 w-full h-[238px] rounded-sm bg-cover bg-center transition-all duration-500 relative overflow-hidden"
                                             style={{
                                                 backgroundImage: sliderImages.length
                                                     ? `url(${sliderImages[activeIndex]})`
                                                     : "none"
                                             }}
            >
                <div className="flex flex-col items-end justify-center h-full w-full p-5">
                    <div className="absolute bottom-3 left-5 flex gap-1">
                        {sliderImages.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === activeIndex ? "bg-primary-dark scale-110" : "bg-sbg"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>) : <Loader text={"Loading slider..."} />}
            <div className={"mt-5"}>
                <div className={"flex justify-between items-center"}>
                    <p className={"text-stxt text-lg font-semibold"}>
                        Categories
                    </p>
                    <img src={rightIcon} alt="rightIcon" className={"w-[10.52px] h-[18px]"} />
                </div>

                {categories.length > 0 ? (<div className={"flex justify-start items-center gap-3 mt-3"}>
                    {categories.map((item, index) => (
                        <div key={index} className={`flex flex-col items-center justify-center`}>
                            <div className={`flex justify-center items-center rounded-full w-[52px] h-[52px] bg-[${item.backgroundColor}]`}>
                                <img className={"w-[23.25px] h-[25.42px]"} src={item.icon} alt="vegetables"/>
                            </div>
                            <p className={"text-ftxt text-[10px] font-medium mt-1.5"}>
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>) : <Loader text={"Loading categories..."} />}
            </div>
        </div>
    );
}

export default Home;