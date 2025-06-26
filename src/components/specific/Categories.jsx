import backIcon from "../../assets/icons/blackBackIcon.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../../lib/supabaseClient.js";
import {useNotification} from "../../context/NotificationProvider.jsx";
import Loader from "./Loader.jsx";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const {notify} = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const {data, error} = await supabase
                .from('categories')
                .select("*")
            data ? setCategories(data) : notify(`Ошибка получения categories: ${error}`, "error");
        }
        fetchCategories();
    }, [notify]);

    return (
        <div>
            <header className="fixed top-0 w-full flex items-center py-1 pr-4 bg-fbg">
                <button className={"p-4"} onClick={() => {
                    navigate("/home");
                    window.scrollTo({ top: 0});
                }}>
                    <img src={backIcon} alt="image" className="w-[23px] h-[16px]"/>
                </button>
                <p className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-normal text-stxt">
                    Categories
                </p>
            </header>
            {categories.length > 0 ? <div className="grid grid-cols-3 gap-3 pt-18 px-4">
                {categories.map((category) => (
                    <div onClick={() => {
                        navigate(`/category/${category.title}`);
                        window.scrollTo({top: 0});
                    }} className={"bg-fbg px-5 py-3"} key={category.id}>
                        <div style={{background: category.backgroundColor}} className={"rounded-full flex items-center justify-center py-[22px]"}>
                            <img src={category.icon} className={"w-7 h-7"} alt={category.title}/>
                        </div>
                        <p className={"text-center text-ftxt font-medium text-[10px] mt-3"} >{category.title}</p>
                    </div>
                ))}
            </div> : <Loader mt={"30px"} text={"Loading categories..."} />}
        </div>
    )
}

export default Categories;