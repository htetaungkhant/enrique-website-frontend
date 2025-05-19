import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import Link from "next/link";

const CourseCard = ({
    image,
    title,
    description,
    instructor,
    dates,
    price,
    className,
}) => {
    return (
        <Link
            href={`/course-offerings/${title}`}
            className={cn(
                "inter-font text-[#212A63] rounded-2xl overflow-hidden",
                className,
            )}
        >
            <Image
                src={image}
                width={312}
                height={225}
                alt="course"
                className="w-full h-auto object-cover"
            />
            <div className="flex flex-col bg-white p-2 lg:p-4">
                <div className="flex flex-col gap-1 pb-1 border-[#2A6C4B] border-b">
                    {title && <h4 className="text-[#2A6C4B] font-semibold">{title}</h4>}
                    {description && <p className="text-sm font-medium">{description}</p>}
                    <div className="py-1 flex gap-2 justify-between">
                        <div className="flex gap-1 items-center">
                            <Image
                                src="/dummy-data/6.png"
                                width={48}
                                height={48}
                                alt="instructor"
                                className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded-full"
                            />
                            <span className="pl-1 text-xs font-medium">{instructor}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <FaCalendarAlt className="text-[#2A6C4B]" />
                            <span className="pl-1 text-xs font-medium">{dates}</span>
                        </div>
                    </div>
                </div>
                <div className="pt-3 flex gap-2 justify-center items-center">
                    <HiCurrencyDollar size={28} className="text-[#2A6C4B]" />
                    <span className="text-lg font-medium">${price}</span>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard;