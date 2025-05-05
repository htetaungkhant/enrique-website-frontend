import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";


const FacilitatorsCard = ({ image, name, className, onReadMoreBtnClick }) => {
    return (
        <div className={cn("p-2 flex flex-col gap-2 justify-between bg-[#DBE3FF] rounded-3xl border-2 border-[#212A63] shadow-lg shadow-[#FFFFFF66]", className)}>
            {image && <Image src={image} width={380} height={410} alt="avator" className="h-3/4 w-full rounded-3xl object-cover" />}
            {name && <span className="merriweather-font text-center text-[#212A63] font-bold text-lg md:text-xl lg:text-2xl">{name}</span>}
            <button onClick={onReadMoreBtnClick} className="py-2 px-2 md:px-4 bg-white rounded-4xl flex justify-between items-center cursor-pointer">
                <span className="text-sm font-medium">READ MORE</span>
                <FaArrowRight size={20} />
            </button>
        </div>
    )
}

export default FacilitatorsCard;