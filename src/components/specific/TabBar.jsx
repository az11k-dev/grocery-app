import {HomeIcon, ProfileIcon, HeartIcon, CartIcon} from "../../assets/icons/index.jsx";

const TabBar = () => {
    return (
        <div className={"flex justify-between items-center bg-fbg py-3 px-7 fixed bottom-0 w-full"}>
            <HomeIcon/>
            <ProfileIcon/>
            <HeartIcon/>
            <div className={"bg-primary-dark rounded-full p-3"}>
                <CartIcon />
            </div>
        </div>
    )
}
export default TabBar;