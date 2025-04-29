import Image from "next/image";

import UPSection from "./UniformPaddingSection";
import { cn } from "@/lib/utils";

export const UniformInfoSection = ({ image, children, imageAspectRatio = "default", reverse = false, className }) => {
    const gridCols = {
        default: reverse ? "lg:grid-cols-[70%_25%]" : "lg:grid-cols-[25%_70%]",
        portrait: reverse ? "lg:grid-cols-[75%_20%]" : "lg:grid-cols-[20%_75%]",
        landscape: reverse ? "lg:grid-cols-[65%_30%]" : "lg:grid-cols-[30%_65%]",
    }

    return (
        <UPSection className={cn(`${gridCols[imageAspectRatio]} max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center lg:grid gap-10 lg:gap-16`, className)}>
            <div className={`order-2 ${reverse ? "lg:order-1" : "lg:order-2"} flex flex-col gap-6`}>
                {children}
            </div>
            {
                image && (
                    <div
                        className={`min-h-80 max-sm:w-full sm:min-h-64 max-lg:w-1/2 lg:min-h-44 order-1 ${reverse ? "lg:order-2" : "lg:order-1"} relative`}
                    >
                        <Image
                            src={image}
                            fill
                            alt="Info"
                            className={`object-cover rounded-tl-[65px] rounded-br-[80px] shadow-lg shadow-[#8A888840]`}
                        />
                    </div>
                )
            }
        </UPSection>
    );
}

const InfoSection = ({ image, children, smallImage = false, reverse = false, className }) => {
    return (
        <UPSection className={cn(`flex justify-center items-center md:justify-between gap-10 lg:gap-20 flex-col lg:items-start ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`, className)}>
            <div className="order-2 flex flex-col gap-6">
                {children}
            </div>
            {
                image && (
                    <div className="order-1">
                        <Image
                            src={image}
                            width={400}
                            height={400}
                            alt="Info"
                            className={`${!smallImage ? "h-full sm:h-64 sm:w-64 sm:min-w-64 md:h-96 md:w-96 md:min-w-96" : "h-full sm:h-48 sm:w-48 sm:min-w-48 md:h-72 md:w-72 md:min-w-72"} object-cover rounded-tl-[65px] rounded-br-[80px] shadow-lg shadow-[#8A888840]`}
                        />
                    </div>
                )
            }
        </UPSection>
    );
}

export default InfoSection;