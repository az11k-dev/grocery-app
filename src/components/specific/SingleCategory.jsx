import backIcon from "../../assets/icons/blackBackIcon.png";
import {useNavigate, useParams} from "react-router-dom";
import rightIcon from "../../assets/icons/rightIcon.png";
import likeIcon from "../../assets/icons/likeIcon.png";
import heartIcon from "../../assets/icons/heartIcon.png";
import minusIcon from "../../assets/icons/minusIcon.png";
import plusIcon from "../../assets/icons/plusIcon.png";
import cartIcon from "../../assets/icons/cartIcon.png";
import Loader from "./Loader.jsx";
import {useCart} from "../../context/CartContext.jsx";
import {useEffect, useState} from "react";
import {supabase} from "../../lib/supabaseClient.js";
import {useUser} from "../../context/UserContext.jsx";
import {useNotification} from "../../context/NotificationProvider.jsx";

const SingleCategory = () => {

    const [likedProducts, setLikedProducts] = useState(new Set());
    const {categoryName} = useParams();
    const user = useUser();
    const {notify} = useNotification();
    const navigate = useNavigate();
    const {addToCart, removeFromCart, cartItems} = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const {data, error} = await supabase
                .from('products')
                .select("*")
                .eq("category", categoryName.toLowerCase())
            data ? setProducts(data) : notify(`Ошибка получения products: ${error}`, "error");
        }
        fetchProducts();
    }, [notify, categoryName]);

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

    const toggleLike = async (categoryId) => {
        const isLiked = likedProducts.has(categoryId);

        setLikedProducts(prev => {
            const newSet = new Set(prev);
            isLiked ? newSet.delete(categoryId) : newSet.add(categoryId);
            return newSet;
        });

        if (isLiked) {
            const {error} = await supabase
                .from('likes')
                .delete()
                .eq("user_id", user.user.id)
                .eq("product_id", categoryId);

            if (error) {
                notify("Ошибка удаления лайка", "error");
                // Откатываем назад
                setLikedProducts(prev => new Set(prev).add(categoryId));
            }
        } else {
            const {error} = await supabase
                .from("likes")
                .insert({user_id: user.user.id, product_id: categoryId});

            if (error) {
                notify("Ошибка добавления лайка", "error");
                // Откатываем назад
                setLikedProducts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(categoryId);
                    return newSet;
                });
            }
        }
    };

    return (
        <div>
            <header className="fixed top-0 w-full flex items-center py-1 pr-4 bg-fbg">
                <button className={"p-4"} onClick={() => {
                    navigate("/categories");
                    window.scrollTo({ top: 0});
                }}>
                    <img src={backIcon} alt="image" className="w-[23px] h-[16px]"/>
                </button>
                <p className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-normal text-stxt">
                    {categoryName}
                </p>
            </header>
            <div className={"py-7 px-4"}>
                <div className={"flex justify-between items-center"}>
                    <p className={"text-stxt text-lg font-semibold"}>
                        Products
                    </p>
                    <img src={rightIcon} alt="rightIcon" className={"w-[10.52px] h-[18px]"}/>
                </div>
                {products.length > 0 ? ( <div className={"grid grid-cols-2 gap-4 mt-5"}>
                        {products.map((category) => {
                            const cartItem = cartItems.find(item => item.id === category.id);
                            return (
                                <div key={category.id} className={"bg-fbg p-2.5 rounded-sm"}>
                                    <div onClick={() => {
                                        navigate(`/product/${category.id}`);
                                        window.scrollTo({ top: 0});
                                    }}>
                                        <div className={"flex items-center justify-end"}>
                                            <button onClick={(e) => {
                                                toggleLike(category.id);
                                                e.stopPropagation();

                                            }}>
                                                <img className={"w-5.5 h-5"}
                                                     src={`${likedProducts.has(category.id) ? likeIcon : heartIcon}`}
                                                     alt="like"/>
                                            </button>
                                        </div>
                                        <div className={"flex flex-col items-center justify-center"}>
                                            <img className={"w-24 h-24"} src={category.img} alt={category.title}/>
                                            <p className={"text-primary-dark font-medium text-xs mt-2"}>
                                                ${category.price}
                                            </p>
                                            <p className={"font-semibold text-sm my-1"}>
                                                {category.title}
                                            </p>
                                            <p className={"text-xs font-medium text-ftxt"}>
                                                {category.weight} lbs
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={"flex justify-center items-center gap-2 border-t border-border mt-2 pt-2"}>
                                        {cartItem ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => removeFromCart(category.id)}
                                                    className="text-primary touch-manipulation px-4 py-1 rounded"
                                                >
                                                    <img className={"w-[13px] h-[2px]"} src={minusIcon}
                                                         alt="decrease"/>
                                                </button>
                                                <span
                                                    className="text-xs font-medium mx-2">{cartItem.quantity}</span>
                                                <button
                                                    onClick={() => addToCart(category)}
                                                    className="text-primary touch-manipulation text-sm px-4 py-1 rounded"
                                                >
                                                    <img className={"w-[13px] h-[13px]"} src={plusIcon}
                                                         alt="increase"/>
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => addToCart(category)}
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
                    </div>) : <Loader text={"Loading products..."}/>}
            </div>
        </div>
    )
}

export default SingleCategory;