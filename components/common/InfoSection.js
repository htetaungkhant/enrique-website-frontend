import Image from "next/image";
import { motion } from "motion/react";

import UPSection from "./UniformPaddingSection";
import { cn } from "@/lib/utils";

export const UniformInfoSection = ({ image, children, imageAspectRatio = "default", reverse = false, className }) => {
    const gridCols = { // 2xl:flex
        default: reverse ? "xl:grid-cols-[70%_25%] 2xl:grid-cols-[82%_15%] 2xl:justify-between 2xl:gap-10" : "xl:grid-cols-[25%_70%] 2xl:grid-cols-[15%_82%] 2xl:justify-between 2xl:gap-10",
        portrait: reverse ? "xl:grid-cols-[75%_20%] 2xl:grid-cols-[85%_12%] 2xl:justify-between 2xl:gap-10" : "xl:grid-cols-[20%_75%] 2xl:grid-cols-[12%_85%] 2xl:justify-between 2xl:gap-10",
        landscape: reverse ? "xl:grid-cols-[65%_30%] 2xl:grid-cols-[77%_20%] 2xl:justify-between 2xl:gap-10" : "xl:grid-cols-[30%_65%] 2xl:grid-cols-[20%_77%] 2xl:justify-between 2xl:gap-10",
    }

    return (
        <UPSection className={cn(`${gridCols[imageAspectRatio]} max-xl:flex max-xl:flex-col max-xl:justify-center max-xl:items-center xl:grid gap-10 xl:gap-16 overflow-hidden`, className)}>
            <motion.div className={`order-2 ${reverse ? "xl:order-1" : "xl:order-2"} flex flex-col gap-6`}
                initial={{ opacity: 0, x: reverse ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {children}
            </motion.div>
            {
                image && (
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={cn(
                            "min-h-80 max-sm:w-full max-xl:w-1/3 xl:min-h-40 3xl:min-h-[26rem] order-1 relative",
                            (imageAspectRatio === "portrait") && "min-w-40",
                            (imageAspectRatio === "default") && "min-w-50",
                            (imageAspectRatio === "landscape") && "min-w-60",
                            reverse ? "xl:order-2" : "xl:order-1",
                        )}
                    >
                        <Image
                            src={image}
                            fill
                            alt="Info"
                            className={`object-cover rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-lg shadow-lg shadow-[#8A888840]`}
                        />
                    </motion.div>
                )
            }
        </UPSection>
    );
}

const InfoSection = ({ image, children, smallImage = false, reverse = false, className }) => {
    return (
        <UPSection className={cn(`flex justify-center items-center md:justify-between gap-10 lg:gap-20 flex-col lg:items-start ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} overflow-hidden`, className)}>
            <motion.div
                initial={{ opacity: 0, x: reverse ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-2 flex flex-col gap-6"
            >
                {children}
            </motion.div>
            {
                image && (
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="order-1"
                    >
                        <Image
                            src={image}
                            width={400}
                            height={400}
                            alt="Info"
                            className={`${!smallImage ? "h-full sm:h-64 sm:w-64 sm:min-w-64 md:h-96 md:w-96 md:min-w-96" : "h-full sm:h-48 sm:w-48 sm:min-w-48 md:h-72 md:w-72 md:min-w-72"} object-cover rounded-tl-[65px] rounded-br-[80px] shadow-lg shadow-[#8A888840]`}
                        />
                    </motion.div>
                )
            }
        </UPSection>
    );
}

export default InfoSection;