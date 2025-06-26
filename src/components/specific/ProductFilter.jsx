import {useNavigate} from "react-router-dom";
import backIcon from "../../assets/icons/blackBackIcon.png";
import resetIcon from "../../assets/icons/resetIcon.png"
import UButton from "../common/UButton.jsx";
import {useFilter} from "../../context/FilterContext.jsx";

const ProductFilter = () => {
    const { filters, updateFilter, resetFilters } = useFilter();
    const navigate = useNavigate();

    const handleApplyFilters = () => {
        navigate("/home");
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <header className="fixed top-0 w-full flex items-center justify-between py-1 pr-4 bg-fbg">
                <button className={"p-4"} onClick={() => {
                    navigate("/home");
                    window.scrollTo({ top: 0});
                }}>
                    <img src={`${backIcon}`} alt="image" className="w-[23px] h-[16px]"/>
                </button>
                <p className="absolute left-1/2 transform -translate-x-1/2 text-[18px] font-normal text-stxt">
                    Apply Filters
                </p>
                <button onClick={resetFilters} className={"p-5 pr-0"}>
                    <img className={"w-5 h-5"} src={`${resetIcon}`} alt=""/>
                </button>
            </header>
            <div className={"px-4 pt-20"}>
                <div className={"bg-fbg rounded-sm"}>
                    <div className={"p-4"}>
                        <p className={"text-sm text-stxt font-semibold mb-2"}>
                            Price Range
                        </p>
                        <div className={"grid grid-cols-2 gap-2"}>
                            <input placeholder={"Min."} value={filters.minPrice}
                                   onChange={(e) => updateFilter("minPrice", e.target.value)} className={"py-3 outline-none pl-3 bg-sbg rounded-[5px]"} type="text"/>
                            <input value={filters.maxPrice}
                                   onChange={(e) => updateFilter("maxPrice", e.target.value)} placeholder={"Max."} className={"py-3 outline-none pl-3 bg-sbg rounded-[5px]"} type="text"/>
                        </div>
                    </div>
                </div>
                <div className={"bg-fbg border-t border-border rounded-sm"}>
                    <div className={"p-4"}>
                        <p className={"text-sm text-stxt font-semibold mb-2"}>
                            Product's weight
                        </p>
                        <div className={"grid grid-cols-2 gap-2"}>
                            <input value={filters.minWeight}
                                   onChange={(e) => updateFilter("minWeight", e.target.value)} placeholder={"Min lbs."} className={"py-3 outline-none pl-3 bg-sbg rounded-[5px]"} type="text"/>
                            <input value={filters.maxWeight}
                                   onChange={(e) => updateFilter("maxWeight", e.target.value)} placeholder={"Max lbs."} className={"py-3 outline-none pl-3 bg-sbg rounded-[5px]"} type="text"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"px-4 absolute w-full bottom-5"}>
                <UButton onClick={() => {
                    handleApplyFilters();
                }} />
            </div>
        </div>
    )
}

export default ProductFilter;