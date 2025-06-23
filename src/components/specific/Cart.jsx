import backIcon from "../../assets/icons/blackBackIcon.png";
import minusIcon from "../../assets/icons/minusIcon.png";
import plusIcon from "../../assets/icons/plusIcon.png";
import {useNavigate} from "react-router-dom";
import {useCart} from "../../context/CartContext.jsx";
import UButton from "../common/UButton.jsx";

const Cart = () => {
    const navigate = useNavigate();
    const { addToCart, removeFromCart, cartItems, totalPrice } = useCart();

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
                    Shopping Cart
                </p>
            </header>
            <div className={"mt-14 flex flex-col px-2"}>
                {cartItems.map((item) => (
                    <div key={item.id} className="bg-fbg flex justify-between items-center p-4 mt-5 rounded-xl">
                        <div className={"flex items-center justify-start gap-5"}>
                            <div>
                                <img className={"w-[63px] h-[63px]"} src={item.img} alt="avacoda"/>
                            </div>
                            <div className={"flex flex-col items-center justify-center gap-1"}>
                                <p className={"text-xs font-medium text-primary-dark"}>
                                    ${item.price} x {item.quantity}
                                </p>
                                <p className={"text-sm font-semibold text-stxt"}>
                                    {item.title}
                                </p>
                                <p className={"text-sm font-normal text-ftxt"}>
                                    {item.weight}
                                </p>
                            </div>
                        </div>
                        <div className={"flex flex-col items-center justify-center gap-5"}>
                            <button onClick={() => addToCart(item)} className={""}>
                                <img className={"w-[15px] h-[15px]"} src={plusIcon} alt=""/>
                            </button>
                            <p className={"text-sm font-medium text-ftxt"}>
                                {item.quantity}
                            </p>
                            <img onClick={() => removeFromCart(item.id)}  className={"w-[15px] h-[2px]"} src={minusIcon} alt=""/>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"bg-fbg p-4 fixed bottom-0 w-full pb-6"}>
                <div className={"border-b border-border pb-5"}>
                    <div className={"flex items-center justify-between mb-2"}>
                        <p className={"text-xs font-medium text-ftxt"}>
                            Subtotal
                        </p>
                        <p className={"text-xs font-medium text-ftxt"}>
                            ${Number((totalPrice * 0.9).toFixed(2))}
                        </p>
                    </div>
                    <div className={"flex items-center justify-between"}>
                        <p className={"text-xs font-medium text-ftxt"}>
                            Shipping costs
                        </p>
                        <p className={"text-xs font-medium text-ftxt"}>
                            ${Number((totalPrice * 0.1).toFixed(2))}
                        </p>
                    </div>
                </div>
                <div className={"pt-5"}>
                    <div className={"flex items-center justify-between"}>
                        <p className={"text-lg font-semibold text-stxt"}>
                            Total
                        </p>
                        <p className={"text-lg font-semibold text-stxt"}>
                            ${Number((totalPrice).toFixed(2))}
                        </p>
                    </div>
                   <UButton mt={"20px"} text={"Checkout"} />
                </div>
            </div>
        </div>
    )
}
export default Cart;