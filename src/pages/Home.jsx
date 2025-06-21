import { useEffect, useState } from "react";
import searchIcon from "../assets/icons/searchIcon.png";
import filterIcon from "../assets/icons/filterIcon.png";
import rightIcon from "../assets/icons/rightIcon.png";
import heartIcon from "../assets/icons/heartIcon.png";
import cartIcon from "../assets/icons/cartIcon.png";
import likeIcon from "../assets/icons/likeIcon.png";
import minusIcon from "../assets/icons/minusIcon.png";
import plusIcon from "../assets/icons/plusIcon.png";
import {supabase} from '../lib/supabaseClient'
import Loader from "../components/specific/Loader.jsx"
import {useNotification} from "../components/specific/NotificationProvider.jsx";
import {useCart} from "../context/CartContext.jsx";
import TabBar from "../components/specific/TabBar.jsx";
import {useUser} from "../context/UserContext.jsx";

function Home() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [sliderImages, setSliderImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [likedProducts, setLikedProducts] = useState(new Set());
    const { notify } = useNotification();
    const { addToCart, removeFromCart, cartItems } = useCart();
    const user = useUser();

    useEffect(() => {
        const fetchSliderImages = async () => {
            const { data, error } = await supabase
                .storage
                .from('images')
                .list('slider', { limit: 100 });

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
                    const { data: publicUrlData, error } = supabase
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

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase
                .from('categories')
                .select("*")
            data ? setCategories(data) :   notify(`Ошибка получения categories: ${error}`, "error");
        }
        fetchCategories();
    }, [notify]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select("*")
            data ? setProducts(data) :   notify(`Ошибка получения products: ${error}`, "error");
        }
        fetchProducts();
    }, [notify]);

    useEffect(() => {
        if (!user?.user?.id) return;

        const fetchLikes = async () => {
            const { data, error } = await supabase
                .from('likes')
                .select("product_id")
                .eq("user_id", user.user.id);

            data
                ? setLikedProducts(new Set(data.map(entry => entry.product_id)))
                : notify(`Ошибка получения likes: ${error}`, "error");
        };

        fetchLikes();
    }, [user?.user?.id, notify]);

    const filteredProducts = products.filter(product =>
        [product.title, product.description, product.weight, product.price]
            .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const toggleLike = async (productId) => {
        if (likedProducts.has(productId)) {
            const {error} = await supabase
            .from('likes')
            .delete()
                .eq("user_id", user.user.id)
                .eq("product_id", productId)
            if (!error) {
                setLikedProducts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(productId);
                    return newSet;
                });
            }
        } else {
            const { error } = await supabase
                .from("likes")
                .insert({ user_id: user.user.id, product_id: productId });

            if (!error) {
                setLikedProducts(prev => new Set(prev).add(productId));
            }
        }
    }

    return (
        <>
        <div className="p-5 pb-20">
            <div className="w-full flex items-center justify-between bg-fbg p-5 rounded-[5px]">
                <img className="w-5 h-5" src={searchIcon} alt="search" />
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    {categories.map((item) => (
                        <div key={item.id} className={`flex flex-col items-center justify-center`}>
                            <div style={{background: item.backgroundColor}} className={`flex justify-center items-center rounded-full w-[52px] h-[52px] bg-[${item.backgroundColor}]`}>
                                <img className={"w-[23.25px] h-[25.42px]"} src={item.icon} alt={item.title} />
                            </div>
                            <p className={"text-ftxt text-[10px] font-medium mt-1.5"}>
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>) : <Loader text={"Loading categories..."} />}
            </div>
            <div className={"mt-8"}>
                <div className={"flex justify-between items-center"}>
                    <p className={"text-stxt text-lg font-semibold"}>
                        Products
                    </p>
                    <img src={rightIcon} alt="rightIcon" className={"w-[10.52px] h-[18px]"} />
                </div>
                {products.length > 0 ? (
                    filteredProducts.length > 0 ? (<div className={"grid grid-cols-2 gap-4 mt-5"}>
                        {filteredProducts.map((product) => {
                            const cartItem = cartItems.find(item => item.id === product.id);
                            return (
                                <div key={product.id} className={"bg-fbg p-2.5"}>
                                    <div>
                                        <div className={"flex items-center justify-end"}>
                                            <img className={"w-4 h-4"} onClick={() => toggleLike(product.id)} src={likedProducts.has(product.id) ? likeIcon : heartIcon} alt="heart"/>
                                        </div>
                                        <div className={"flex flex-col items-center justify-center"}>
                                            <img className={"w-24 h-24"} src={product.img} alt={product.title} />
                                            <p className={"text-primary-dark font-medium text-xs mt-2"}>
                                                ${product.price}
                                            </p>
                                            <p className={"font-semibold text-sm my-1"}>
                                                {product.title}
                                            </p>
                                            <p className={"text-xs font-medium text-ftxt"}>
                                                {product.weight}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={"flex justify-center items-center gap-2 border-t border-border mt-2 pt-2"}>
                                        {cartItem ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => removeFromCart(product.id)}
                                                    className="text-primary px-2 py-1 rounded"
                                                >
                                                    <img className={"w-[13px] h-[2px]"} src={minusIcon} alt="minus"/>
                                                </button>
                                                <span className="text-xs font-medium mx-2">{cartItem.quantity}</span>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="text-primary text-sm px-2 py-1 rounded"
                                                >
                                                    <img className={"w-[13px] h-[13px]"} src={plusIcon} alt="plus"/>
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => addToCart(product)}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <img className="w-[13px] h-[15px]" src={cartIcon} alt="cart" />
                                                <p className="font-medium text-xs">
                                                    Add to cart
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>) : <p className="text-center text-primary-dark mt-20">No products found.</p>
                ) : <Loader text={"Loading products..."} />}
            </div>
        </div>
            <TabBar />
        </>
    );
}

export default Home;
