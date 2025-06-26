import backIcon from "../../assets/icons/blackBackIcon.png"
import heartIcon from "../../assets/icons/heartIcon.png";
import minusIcon from "../../assets/icons/minusIcon.png";
import plusIcon from "../../assets/icons/plusIcon.png";
import UButton from "../common/UButton.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../../lib/supabaseClient.js";
import {useCart} from "../../context/CartContext.jsx";
import {useNotification} from "../../context/NotificationProvider.jsx";
import Loader from "./Loader.jsx";
import likeIcon from "../../assets/icons/likeIcon.png";
import {useUser} from "../../context/UserContext.jsx";

export default function ProductDetails() {

    const [product, setProduct] = useState(null);
    const [likedProducts, setLikedProducts] = useState(new Set());
    const user = useUser();
    const {addToCart, removeFromCart, cartItems} = useCart();
    const navigate = useNavigate();
    const {id} = useParams();
    const { notify } = useNotification();

    useEffect(() => {
        const fetchProduct = async () => {
            const {data, error} = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single()
            if (data) {
                setProduct(data);
            } else {
                notify(`Error: ${error}`, "error")
            }
        }
        fetchProduct();
    }, [id, notify]);

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
        <div className={"max-h-screen"}>
            {product && Object.keys(product).length > 0 ? (
                ""
            ) : (
                <Loader text={"Loading product..."} />
            )}
            {product && Object.keys(product).length > 0 && (() => {
                const cartItem = cartItems.find(item => item.id === product.id);
                return (
                    <div>
                        <div className={"bg-fbg px-5 pb-5"}>
                            <div className={"flex items-start justify-start pt-8 mb-8"}>
                                <img onClick={() => {
                                    navigate("/home");
                                    window.scrollTo({ top: 0});
                                }} className={"w-[23px] h-[16px]"} src={backIcon} alt="back"/>
                            </div>
                            <div className={"flex items-center justify-center mb-5"}>
                                <img className={"w-[324px] h-[324px]"} src={product?.img} alt="product"/>
                            </div>
                        </div>
                        <div className={"p-5"}>
                            <div className={"flex items-center justify-between"}>
                                <p className={"text-lg font-semibold text-primary-dark"}>
                                    ${product?.price}
                                </p>
                                <img onClick={() => toggleLike(product.id)} className={"w-5.5 h-5"} src={`${likedProducts.has(product.id) ? likeIcon : heartIcon}`} alt=""/>
                            </div>
                            <p className={"text-xl font-semibold"}>
                                {product?.title}
                            </p>
                            <p className={"text-xs font-medium text-ftxt mt-1"}>
                                {product?.weight}
                            </p>
                            <p className={"text-xs font-normal text-ftxt mt-3"}>
                                {product?.description}
                            </p>
                            <div className={"flex items-center justify-between bg-fbg rounded-[5px] px-4 py-2 mb-4 mt-5"}>
                                <p>
                                    Quantity
                                </p>
                                <div className={"flex items-center justify-center gap-3"}>
                                    <button onClick={() => removeFromCart(product?.id)} className={"p-3"}>
                                        <img className={"w-[15px] h-0.5"} src={`${minusIcon}`} alt="decrease"/>
                                    </button>
                                    <p className={"px-1"}>
                                        {cartItem ? cartItem.quantity : 0}
                                    </p>
                                    <button onClick={() => addToCart(product)} className={"p-3"}>
                                        <img className={"w-[15px] h-[15px]"} src={`${plusIcon}`} alt="increase"/>
                                    </button>
                                </div>
                            </div>
                            <UButton onClick={() => {navigate("/cart"); window.scrollTo({ top: 0});}} text={"To cart"}/>
                        </div>
                    </div>
                );
            })()}
        </div>
    )
}