import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillEuroCircle } from "react-icons/ai";
import { HiBadgeCheck } from "react-icons/hi";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import Link from "next/link";

const CourseCard = ({
    id,
    image,
    title,
    description,
    instructor,
    instructorImage,
    dates,
    price,
    purchase = false,
    disableLink = false,
    className,
}) => {
    const content = (
        <>
            <Image
                src={image}
                width={312}
                height={225}
                alt="course"
                className="w-full h-64 object-cover"
            />
            <div className="flex-1 flex flex-col bg-white p-2 lg:p-4">
                <div className="flex-1 flex flex-col gap-1 pb-1 border-[#2A6C4B] border-b">
                    {title && <h4 className="text-[#2A6C4B] font-semibold">{title}</h4>}
                    {description && <p className="flex-1 text-sm font-medium line-clamp-2">{description}</p>}
                    <div className="py-1 flex gap-2 justify-between">
                        <div className="flex gap-1 items-center">
                            <Image
                                src={instructorImage}
                                width={48}
                                height={48}
                                alt="instructor"
                                className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded-full"
                            />
                            <span className="pl-1 text-xs font-medium">{instructor}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <FaCalendarAlt className="text-[#2A6C4B]" />
                            <span className="pl-1 text-xs font-medium">
                                {dates && !isNaN(new Date(dates))
                                    ? format(new Date(dates), "dd/MM/yyyy")
                                    : "Invalid Date"
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <div className="pt-3 flex gap-2 justify-center items-center">
                    {
                        purchase ?
                            (
                                <>
                                    <span className="text-lg font-medium">Purchased</span>
                                    <HiBadgeCheck size={32} className="text-[#2A6C4B]" />
                                </>
                            )
                            : (
                                <>
                                    <AiFillEuroCircle size={28} className="text-[#2A6C4B]" />
                                    <span className="text-lg font-medium">{price}</span>
                                </>
                            )
                    }
                </div>
            </div>
        </>
    )

    if (disableLink) {
        return (
            <div
                className={cn(
                    "inter-font text-[#212A63] flex flex-col rounded-2xl overflow-hidden",
                    className,
                )}
            >
                {content}
            </div>
        )
    }

    return (
        <Link
            href={`/course-offerings/${title.replaceAll(/\s+/g, '-').toLowerCase()}`}
            className={cn(
                "inter-font text-[#212A63] flex flex-col rounded-2xl overflow-hidden",
                className,
            )}
        >
            {content}
        </Link>
    )
}

export default CourseCard;