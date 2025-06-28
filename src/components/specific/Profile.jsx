import {
    ProfileIcon,
    HeartIcon,
    BoxIcon,
    PlaceIcon,
    CardIcon,
    TransactionIcon,
    BellIcon,
    LogoutIcon
} from "../../assets/icons/index.jsx";
import RightIcon from "../../assets/icons/rightIcon.png";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/UserContext.jsx";
import TabBar from "./TabBar.jsx";
import {supabase} from "../../lib/supabaseClient.js";
import {useNotification} from "../../context/NotificationProvider.jsx";
import Loader from "./Loader.jsx";
const Profile = () => {

    const navigate = useNavigate();
    const user = useUser();
    const notify = useNotification();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        window.location.reload();
        if (error) {
            notify(error, "error");
        }
    }

    const profileData = [
        {
            id: 1,
            icon: <ProfileIcon/>,
            text: "About Me",
            link: "/"
        },
        {
            id: 2,
            icon: <BoxIcon/>,
            text: "My orders",
            link: "/",
        },
        {
            id: 3,
            icon: <HeartIcon width={20} height={16} bg={"#28B446"}/>,
            text: "My Favorites",
            link: "/",
        },
        {
            id: 4,
            icon: <PlaceIcon ml={2}/>,
            text: "My Address",
            link: "/",
        },
        {
            id: 5,
            icon: <CardIcon/>,
            text: "Credit Cards",
            link: "/",
        },
        {
            id: 6,
            icon: <TransactionIcon/>,
            text: "Transactions",
            link: "/",
        },
        {
            id: 7,
            icon: <BellIcon/>,
            text: "Notifications",
            link: "/",
        },
        {
            id: 8,
            icon: <LogoutIcon />,
            text: "Sign out",
            link: "/",
            logout: true
        }

    ]

    return (
        <>
            {user.loading ? <Loader text={"Loading your profile..."} /> : (<div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <img className={"rounded-full w-[114px] h-[114px]"} src={ user?.user?.avatar ? user?.user?.avatar : "https://erxubvcjrzetozqfzkpg.supabase.co/storage/v1/object/public/images/avatars/avatar.jpg"} alt="avatar"/>
                    <p className={"text-center font-semibold text-sm my-1"}>
                        {user?.user?.fullName}
                    </p>
                    <p className={"text-ftxt font-normal text-xs text-center"}>
                        {user?.user?.email}
                    </p>
                </div>
                <div className={"mt-10 flex flex-col justify-center gap-6 px-7"}>
                    {profileData.map((profile) => (
                        <div onClick={() => {
                            profile.logout ? handleLogout() : navigate(profile.link);
                            window.scrollTo(0,0);
                        }} className={"flex items-center justify-between"} key={profile.id}>
                            <div className={"flex items-center gap-3"}>
                                {profile.icon}
                                <p className={"font-semibold text-xs"}>
                                    {profile.text}
                                </p>
                            </div>
                            {profile?.logout ? "" : <button>
                                <img className={"w-[10px] h-[17px]"} src={`${RightIcon}`} alt={profile.text}/>
                            </button>}
                        </div>
                    ))}
                </div>
                <TabBar/>
            </div>) }
        </>
    )
}

export default Profile;