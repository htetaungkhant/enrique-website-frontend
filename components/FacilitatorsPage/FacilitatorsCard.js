import { cn } from "@/lib/utils";
import Image from "next/image";

import { ReadMoreBtn } from "../common/Button";

const FacilitatorsCard = ({ image, name, className, onReadMoreBtnClick }) => {
    return (
        <div className={cn("p-2 flex flex-col gap-2 justify-between bg-[#DBE3FF] rounded-3xl border-2 border-[#212A63] shadow-lg shadow-[#FFFFFF66]", className)}>
            {image && <Image src={image} width={380} height={410} alt="avator" className="h-full w-full rounded-3xl object-cover" />}
            {name && <span className="mt-3 merriweather-font text-center text-[#212A63] font-bold text-lg md:text-xl lg:text-2xl">{name}</span>}
            <ReadMoreBtn onClick={onReadMoreBtnClick} className="mt-3" />
        </div>
    )
}

export default FacilitatorsCard;