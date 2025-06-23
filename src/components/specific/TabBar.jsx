import {HomeIcon, ProfileIcon, HeartIcon, CartIcon} from "../../assets/icons/index.jsx";
import {useNavigate} from "react-router-dom";

const TabBar = () => {
    const navigate = useNavigate();
    return (
        <div className={"flex justify-between items-center bg-fbg py-2 px-7 fixed bottom-0 w-full"}>
            <HomeIcon onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0});
            }} />
            <ProfileIcon onClick={() => {
                navigate("/profile");
                window.scrollTo({ top: 0});
            }} />
            <HeartIcon onClick={() => {
                navigate("/favorites");
                window.scrollTo({ top: 0});
            }} />
            <div onClick={() => {
                navigate("/cart");
                window.scrollTo({ top: 0});
            }} className={"bg-primary-dark rounded-full p-2"}>
                <CartIcon />
            </div>
        </div>
    )
}
export default TabBar;