import {useEffect, useState} from "react";
import {supabase} from "../../lib/supabaseClient.js";
import Loader from "./Loader.jsx";
import {useNotification} from "../../context/NotificationProvider.jsx";

const Slider = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [sliderImages, setSliderImages] = useState([]);
    const {notify} = useNotification();

    useEffect(() => {
        const fetchSliderImages = async () => {
            const {data, error} = await supabase
                .storage
                .from('images')
                .list('slider', {limit: 100});

            if (error) {
                notify(`Ошибка загрузки изображений: ${error}`, "error");
                return;
            }

            const imageFiles = data.filter(
                (file) =>
                    file.metadata?.size > 0
            );

            const urls = await Promise.all(
                imageFiles.map(async (file) => {
                    const {data: publicUrlData, error} = supabase
                        .storage
                        .from('images/slider')
                        .getPublicUrl(file.name);

                    if (error) {
                        notify(`Ошибка получения URL: ${error}`, "error");
                        return null;
                    }

                    return publicUrlData.publicUrl;
                })
            );

            setSliderImages(urls.filter(Boolean));

        };

        fetchSliderImages();
    }, [notify]);

    useEffect(() => {
        if (sliderImages.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % sliderImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [sliderImages]);

    return (
        <div>
            {sliderImages.length > 0 ? (<div
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
            </div>) : <Loader text={"Loading slider..."}/>}
        </div>
    )
}
export default Slider;