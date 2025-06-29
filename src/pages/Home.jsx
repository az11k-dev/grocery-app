import {useEffect, useMemo, useState} from "react";
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
import {useNotification} from "../context/NotificationProvider.jsx";
import {useCart} from "../context/CartContext.jsx";
import TabBar from "../components/specific/TabBar.jsx";
import {useUser} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import { useFilter } from "../context/FilterContext";
import Slider from "../components/specific/Slider.jsx";

function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [likedProducts, setLikedProducts] = useState(new Set());
    const {notify} = useNotification();
    const {addToCart, removeFromCart, cartItems} = useCart();
    const user = useUser();
    const navigate = useNavigate();
    const { filters, removeFilter, resetFilters, isActive } = useFilter();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            const user = data.session?.user;

            if (user) {
                // если вошёл через Google
                if (user.app_metadata?.provider === 'google' || user.app_metadata?.provider === 'github') {
                    const { data: existingProfile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (!existingProfile) {
                        await supabase.from('profiles').insert({
                            id: user.id,
                            email: user.email,
                            fullName: user.user_metadata.full_name,
                            avatar: user.user_metadata.avatar_url,
                        });
                    }
                }
            }
        };

        checkSession();
    }, [navigate]);

    useEffect(() => {
        const fetchCategories = async () => {
            const {data, error} = await supabase
                .from('categories')
                .select("*")
            data ? setCategories(data) : notify(`Ошибка получения categories: ${error}`, "error");
        }
        fetchCategories();
    }, [notify]);

    useEffect(() => {
        const fetchProducts = async () => {
            const {data, error} = await supabase
                .from('products')
                .select("*")
            data ? setProducts(data) : notify(`Ошибка получения products: ${error}`, "error");
        }
        fetchProducts();
    }, [notify]);

    useEffect(() => {
        if (!user?.user?.id) return;

        const fetchLikes = async () => {
            const {data, error} = await supabase
                .from('likes')
                .select("product_id")
                .eq("user_id", user.user.id);

            data
                ? setLikedProducts(new Set(data.map(entry => entry.product_id)))
                : notify(`Ошибка получения likes: ${error}`, "error");
        };

        fetchLikes();
    }, [user?.user?.id, notify]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const titleMatch =  [product.title, product.description, product.weight, product.price]
                .some(field => String(field)?.toLowerCase().includes(searchTerm.toLowerCase()))
                const priceMatch =
                    (!filters.minPrice || product.price >= +filters.minPrice) &&
                    (!filters.maxPrice || product.price <= +filters.maxPrice);

                const weightMatch =
                    (!filters.minWeight || +product.weight >= +filters.minWeight) &&
                    (!filters.maxWeight || +product.weight <= +filters.maxWeight);

                return titleMatch && priceMatch && weightMatch;
        }
        );}, [products, searchTerm, filters])

    const toggleLike = async (productId) => {
        const isLiked = likedProducts.has(productId);

        // Оптимистично обновляем UI
        setLikedProducts(prev => {
            const newSet = new Set(prev);
            isLiked ? newSet.delete(productId) : newSet.add(productId);
            return newSet;
        });

        if (isLiked) {
            const {error} = await supabase
                .from('likes')
                .delete()
                .eq("user_id", user.user.id)
                .eq("product_id", productId);

            if (error) {
                notify("Ошибка удаления лайка", "error");
                // Откатываем назад
                setLikedProducts(prev => new Set(prev).add(productId));
            }
        } else {
            const {error} = await supabase
                .from("likes")
                .insert({user_id: user.user.id, product_id: productId});

            if (error) {
                notify("Ошибка добавления лайка", "error");
                // Откатываем назад
                setLikedProducts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(productId);
                    return newSet;
                });
            }
        }
    };

    return (
        <>
            <div className="p-5 pb-20">
                <div className="w-full flex items-center justify-between bg-fbg rounded-[5px]">
                    <button className={"p-5"}>
                        <img className="w-6 h-5" src={searchIcon} alt="search"/>
                    </button>
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-[80%] outline-none h-full text-sm text-ftxt font-medium bg-transparent"
                        placeholder="Search keywords..."
                        type="search"
                    />
                    {isActive && (
                        <div className="absolute top-9 right-[55px] w-2 h-2 bg-primary-dark rounded-full" />
                    )}
                    <button onClick={() => {
                        navigate("/filter");
                        window.scrollTo({top: 0});
                    }} className={"p-5"}>
                        <img className="w-6 h-5" src={filterIcon} alt="filter"/>
                    </button>
                </div>
                <Slider/>
                <div className={"mt-5"}>
                    <div className={"flex justify-between items-center"}>
                        <p className={"text-stxt text-lg font-semibold"}>
                            Categories
                        </p>
                        <button onClick={() => {
                            navigate("/categories");
                            window.scrollTo({ top: 0});
                        }} className={"p-3 pr-0"}>
                            <img src={rightIcon} alt="rightIcon" className={"w-[10.52px] h-[18px]"}/>
                        </button>
                    </div>

                    {categories.length > 0 ? (<div
                        className={"flex justify-start items-center gap-3 mt-3 overflow-x-auto scroll-smooth no-scrollbar"}>
                        {categories.map((item) => (
                            <div onClick={() => {
                                navigate(`/category/${item.title}`);
                                window.scrollTo({top: 0});
                            }} key={item.id} className={`flex flex-col items-center justify-center`}>
                                <div style={{background: item.backgroundColor}}
                                     className={`flex justify-center items-center rounded-full w-[52px] h-[52px] bg-[${item.backgroundColor}]`}>
                                    <img className={"w-[23.25px] h-[25.42px]"} src={item.icon} alt={item.title}/>
                                </div>
                                <p className={"text-ftxt text-[10px] font-medium mt-1.5"}>
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>) : <Loader text={"Loading categories..."}/>}
                </div>
                <div className={"mt-8"}>
                    <div className={"flex justify-between items-center"}>
                        <p className={"text-stxt text-lg font-semibold"}>
                            Products
                        </p>
                        <img src={rightIcon} alt="rightIcon" className={"w-[10.52px] h-[18px]"}/>
                    </div>
                    {isActive && (
                        <div className="flex gap-2 flex-wrap mt-3">
                            {filters.minPrice && (
                                <span className="text-xs bg-fbg text-primary-dark px-2 py-1 rounded">
                                    Цена от ${filters.minPrice}
                                    <button onClick={() => removeFilter("minPrice")} className="ml-2">✕</button>
                                </span>
                            )}
                            {filters.maxPrice && (
                                <span className="text-xs bg-fbg text-primary-dark px-2 py-1 rounded">
                                    До ${filters.maxPrice}
                                    <button onClick={() => removeFilter("maxPrice")} className="ml-2">✕</button>
                                </span>
                            )}
                            {filters.minWeight && (
                                <span className="text-xs bg-fbg text-primary-dark px-2 py-1 rounded">
                                    От {filters.minWeight} lbs
                                    <button onClick={() => removeFilter("minWeight")} className="ml-2">✕</button>
                                </span>
                            )}  {filters.maxWeight && (
                            <span className="text-xs bg-fbg text-primary-dark px-2 py-1 rounded">
                                    До {filters.maxWeight} lbs
                                <button onClick={() => removeFilter("maxWeight")} className="ml-2">✕</button>
                                </span>
                        )}
                            <button onClick={resetFilters} className="text-xs text-red-500 underline">
                                Сбросить всё
                            </button>
                        </div>
                    )}
                    {products.length > 0 ? (
                        filteredProducts.length > 0 ? (<div className={"grid grid-cols-2 gap-4 mt-5"}>
                            {filteredProducts.map((product) => {
                                const cartItem = cartItems.find(item => item.id === product.id);
                                return (
                                    <div key={product.id} className={"bg-fbg p-2.5 rounded-sm"}>
                                        <div onClick={() => {
                                            navigate(`/product/${product.id}`);
                                            window.scrollTo({ top: 0});
                                        }}>
                                            <div className={"flex items-center justify-end"}>
                                                <button onClick={(e) => {
                                                    toggleLike(product.id);
                                                    e.stopPropagation();

                                                }}>
                                                    <img className={"w-5.5 h-5"}
                                                         src={`${likedProducts.has(product.id) ? likeIcon : heartIcon}`}
                                                         alt="like"/>
                                                </button>
                                            </div>
                                            <div className={"flex flex-col items-center justify-center"}>
                                                <img className={"w-24 h-24"} src={product.img} alt={product.title}/>
                                                <p className={"text-primary-dark font-medium text-xs mt-2"}>
                                                    ${product.price}
                                                </p>
                                                <p className={"font-semibold text-sm my-1"}>
                                                    {product.title}
                                                </p>
                                                <p className={"text-xs font-medium text-ftxt"}>
                                                    {product.weight} lbs
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={"flex justify-center items-center gap-2 border-t border-border mt-2 pt-2"}>
                                            {cartItem ? (
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => removeFromCart(product.id)}
                                                        className="text-primary touch-manipulation px-4 py-1 rounded"
                                                    >
                                                        <img className={"w-[13px] h-[2px]"} src={minusIcon}
                                                             alt="decrease"/>
                                                    </button>
                                                    <span
                                                        className="text-xs font-medium mx-2">{cartItem.quantity}</span>
                                                    <button
                                                        onClick={() => addToCart(product)}
                                                        className="text-primary touch-manipulation text-sm px-4 py-1 rounded"
                                                    >
                                                        <img className={"w-[13px] h-[13px]"} src={plusIcon}
                                                             alt="increase"/>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => addToCart(product)}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <img className="w-[13px] h-[15px]" src={cartIcon} alt="cart"/>
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
                    ) : <Loader text={"Loading products..."}/>}
                </div>
            </div>
            <TabBar/>
        </>
    );
}

export default Home;