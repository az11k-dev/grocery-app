import { useEffect, useState } from "react";
import searchIcon from "../assets/icons/searchIcon.png";
import filterIcon from "../assets/icons/filterIcon.png";
import {supabase} from '../lib/supabaseClient'

function Home() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [sliderImages, setSliderImages] = useState([]);

    useEffect(() => {
        const fetchSliderImages = async () => {
            const { data, error } = await supabase
                .storage
                .from('images') // <-- название вашего bucket
                .list('', { limit: 100 });

            if (error) {
                console.error('Ошибка загрузки изображений:', error);
                return;
            }

            const urls = await Promise.all(
                data.map(async (file) => {
                    const { data: publicUrlData, error } = supabase
                        .storage
                        .from('images')
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

            <div
                className="mt-5 w-full h-[238px] rounded-sm bg-cover bg-center transition-all duration-500 relative overflow-hidden"
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
            </div>
        </div>
    );
}

export default Home;