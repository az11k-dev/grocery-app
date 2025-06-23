import backIcon from "../../assets/icons/blackBackIcon.png"
import Avacoda from "../../assets/images/avacoda.png"
import heartIcon from "../../assets/icons/heartIcon.png";
import minusIcon from "../../assets/icons/minusIcon.png";
import plusIcon from "../../assets/icons/plusIcon.png";
import UButton from "../common/UButton.jsx";
import {useNavigate} from "react-router-dom";

export default function ProductDetails() {

    const navigate = useNavigate();

    const productData = {
        id: 1,
        img: Avacoda,
        price: 2.22,
        title: "Organic Lemons",
        weight: "1.50 lbs",
        description: "Organic Mountain works as a seller for many organic growers of organic lemons. Organic lemons are easy to spot in your produce aisle. They are just like regular lemons, but they will usually have a few more scars on the outside of the lemon skin. Organic lemons are considered to be the world's finest lemon for juicing",
        quantity: 2
    }

    return (
        <div className={""}>
            <div className={"bg-fbg px-5"}>
                <div className={"flex items-start justify-start pt-9 mb-12"}>
                    <img onClick={() => navigate("/home")} className={"w-[23px] h-[16px]"} src={backIcon} alt="back"/>
                </div>
                <div className={"flex items-center justify-center mb-5"}>
                    <img className={"w-[324px] h-[324px]"} src={productData.img} alt="product"/>
                </div>
            </div>
            <div className={"p-5"}>
                <div className={"flex items-center justify-between"}>
                    <p className={"text-lg font-semibold text-primary-dark"}>
                        ${productData.price}
                    </p>
                    <img className={"w-5 h-[18px]"} src={heartIcon} alt=""/>
                </div>
                <p className={"text-xl font-semibold"}>
                    {productData.title}
                </p>
                <p className={"text-xs font-medium text-ftxt mt-1"}>
                    {productData.weight}
                </p>
                <p className={"text-xs font-normal text-ftxt mt-5"}>
                    {productData.description}
                </p>
                <div className={"flex items-center justify-between bg-fbg rounded-[5px] p-4 mb-5 mt-5"}>
                    <p>
                        Quantity
                    </p>
                    <div className={"flex items-center justify-center gap-3"}>
                        <img className={"w-[13px] h-0.5"} src={minusIcon} alt="decrease"/>
                        <p className={"px-1"}>
                            {productData.quantity}
                        </p>
                        <img className={"w-[13px] h-[13px]"} src={plusIcon} alt="increase"/>
                    </div>
                </div>
                <UButton text={"Add to cart"}/>
            </div>
        </div>
    )
}