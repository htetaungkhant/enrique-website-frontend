import Image from "next/image";

import UPSection from "./UniformPaddingSection";
import { cn } from "@/lib/utils";

export const UniformInfoSection = ({ image, children, imageAspectRatio = "default", reverse = false, className }) => {
    const gridCols = { // 2xl:flex
        default: reverse ? "xl:grid-cols-[70%_25%] 2xl:grid-cols-[82%_15%] 2xl:justify-between 2xl:gap-10" : "xl:grid-cols-[25%_70%] 2xl:grid-cols-[15%_82%] 2xl:justify-between 2xl:gap-10",
        portrait: reverse ? "xl:grid-cols-[75%_20%] 2xl:grid-cols-[85%_12%] 2xl:justify-between 2xl:gap-10" : "xl:grid-cols-[20%_75%] 2xl:grid-cols-[12%_85%] 2xl:justify-between 2xl:gap-10",
        landscape: reverse ? "xl:grid-cols-[65%_30%] 2xl:grid-cols-[77%_20%] 2xl:justify-between 2xl:gap-10" : "xl:grid-cols-[30%_65%] 2xl:grid-cols-[20%_77%] 2xl:justify-between 2xl:gap-10",
    }

    return (
        <UPSection className={cn(`${gridCols[imageAspectRatio]} max-xl:flex max-xl:flex-col max-xl:justify-center max-xl:items-center xl:grid gap-10 xl:gap-16`, className)}>
            <div className={`order-2 ${reverse ? "xl:order-1" : "xl:order-2"} flex flex-col gap-6`}>
                {children}
            </div>
            {
                image && (
                    <div
                        className={`min-h-80 min-w-60 max-sm:w-full max-xl:w-1/3 xl:min-h-40 3xl:min-h-[26rem] order-1 ${reverse ? "xl:order-2" : "xl:order-1"} relative`} // 2xl:min-h-80 
                    >
                        <Image
                            src={image}
                            fill
                            alt="Info"
                            className={`object-cover rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg shadow-lg shadow-[#8A888840]`}
                        />
                    </div>
                    // <>
                    //     <div
                    //         className={`block 2xl:hidden min-h-80 max-sm:w-full sm:min-h-64 max-lg:w-1/2 lg:min-h-44 order-1 ${reverse ? "lg:order-2" : "lg:order-1"} relative`}
                    //     >
                    //         <Image
                    //             src={image}
                    //             fill
                    //             alt="Info"
                    //             className={`object-cover rounded-tl-[65px] rounded-br-[80px] shadow-lg shadow-[#8A888840]`}
                    //         />
                    //     </div>
                    //     <div
                    //         className={`hidden 2xl:block min-h-80 max-sm:w-full sm:min-h-64 max-lg:w-1/2 lg:min-h-44 w-1/4 order-1 ${reverse ? "lg:order-2" : "lg:order-1"} relative`}
                    //     >
                    //         <Image
                    //             src={image}
                    //             width={300}
                    //             height={300}
                    //             alt="Info"
                    //             className={`w-full h-full object-cover rounded-tl-[65px] rounded-br-[80px] shadow-lg shadow-[#8A888840]`}
                    //         />
                    //     </div>
                    // </>
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