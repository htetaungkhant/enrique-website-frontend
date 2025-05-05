import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { ReadMoreBtn } from "../common/Button";

const CeremonyCard = ({ image, title, locations, dates, time, learnMoreHref, className }) => {
    return (
        <div className={cn("inter-font text-[#403D4E] bg-white rounded-3xl shadow-xl ring ring-[#A5F3CC40] shadow-[#A5F3CC40] overflow-hidden", className)}>
            <div className="h-48 rounded-3xl bg-center bg-cover bg-no-repeat relative" style={{ backgroundImage: `url(${image})` }}></div>
            <div className="pt-10 -mt-5 rounded-bl-3xl border-l-8 border-[#3FA535] px-4 py-6 flex flex-col gap-3">
                <h4 className="text-xl font-bold">{title}</h4>
                <div className="font-medium flex flex-col gap-1">
                    <div className="flex gap-3 items-center">
                        <FaLocationDot className="text-[#1C3896] bg-[#1C389659] p-1 rounded-full w-5 h-5" />
                        <p>{locations}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <IoCalendarClear className="text-[#1C3896] bg-[#1C389659] p-1 rounded-full w-5 h-5" />
                        <p>{dates}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <MdOutlineAccessTimeFilled className="text-[#1C3896] bg-[#1C389659] p-1 rounded-full w-5 h-5" />
                        <p>{time}</p>
                    </div>
                </div>
                <ReadMoreBtn className="bg-[#B6E3B1] h-10" href={learnMoreHref} />
            </div>
        </div>
    )
}

export default CeremonyCard;