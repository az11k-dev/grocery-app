const Loader = ({text}) => {
    return (
        <div className="flex items-center justify-center w-full h-full my-10 bg-transparent">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent loader-animation"></div>
                    <div className="absolute inset-2 bg-emerald-500 rounded-full"></div>
                </div>
                <p className="text-emerald-600 font-semibold text-sm tracking-wide animate-pulse">
                    {text ? text : "Loading your shop..."}
                </p>
            </div>
        </div>
    )
}
export default Loader;