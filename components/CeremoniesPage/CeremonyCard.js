import Image from "next/image";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { toZonedTime, format } from "date-fns-tz";

import { cn } from "@/lib/utils";
import { ReadMoreBtn } from "../common/Button";

const CeremonyCard = ({
  id,
  image,
  title,
  locations,
  startDate,
  endDate,
  learnMoreHref,
  soldOut = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "inter-font text-[#403D4E] bg-white rounded-3xl shadow-xl ring ring-[#A5F3CC40] shadow-[#A5F3CC40] flex flex-col overflow-hidden",
        className
      )}
    >
      <div
        className="h-48 rounded-3xl bg-center bg-cover bg-no-repeat relative z-10"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="flex-1 pt-10 -mt-5 rounded-bl-3xl border-l-8 border-[#3FA535] px-4 py-6 flex flex-col gap-3 relative">
        {soldOut && (
          <Image
            src="/image/sold-out.png"
            width={100}
            height={100}
            className="absolute top-0 right-0 z-20"
            alt="sold out"
          />
        )}
        <h4 className="text-lg lg:text-xl font-bold">{title}</h4>
        <div className="flex-1 font-medium flex flex-col gap-1">
          {locations && (
            <div className="flex gap-3 items-center text-xs md:text-sm">
              <FaLocationDot className="text-[#1C3896] bg-[#1C389659] p-1 rounded-full w-5 h-5" />
              <p>{locations}</p>
            </div>
          )}
          {startDate && endDate && (
            <>
              <div className="flex gap-3 items-center text-xs md:text-sm">
                <IoCalendarClear className="text-[#1C3896] bg-[#1C389659] p-1 rounded-full w-5 h-5" />
                <p>{`From ${format(
                  toZonedTime(new Date(startDate), "UTC"),
                  "dd MMM yyyy",
                  { timeZone: "UTC" }
                )} to ${format(
                  toZonedTime(new Date(endDate), "UTC"),
                  "dd MMM yyyy",
                  { timeZone: "UTC" }
                )}`}</p>
              </div>

              <div className="flex gap-3 items-center text-xs md:text-sm">
                <MdOutlineAccessTimeFilled className="text-[#1C3896] bg-[#1C389659] p-1 rounded-full w-5 h-5" />
                <p>{`${format(
                  toZonedTime(new Date(startDate), "UTC"),
                  "hh:mm a",
                  { timeZone: "UTC" }
                )} - ${format(
                  toZonedTime(new Date(endDate), "UTC"),
                  "hh:mm a",
                  { timeZone: "UTC" }
                )}`}</p>
              </div>
            </>
          )}
        </div>
        <ReadMoreBtn className="bg-[#B6E3B1] h-10" href={learnMoreHref} />
      </div>
    </div>
  );
};

export default CeremonyCard;
