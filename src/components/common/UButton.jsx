export default function UButton({text, onClick, mt, type}) {
    return (
            <button style={{marginTop: mt, background: "linear-gradient(91.78deg, #AEDC81 1.21%, #6CC51D 100.55%)"}} type={type} onClick={onClick} className={`flex items-center justify-center w-full py-5 text-sm font-semibold text-fbg rounded-[5px]`}>
                {text ? text : "Submit"}
            </button>
    )
}