import { motion } from "motion/react"
import Image from "next/image";

import { cn } from "@/lib/utils";

const AnimatedCard = ({
    title,
    titleClassName,
    description,
    descriptionClassName,
    className,
    animatedOverlayClassName,
    children
}) => {

    const parentVariants = {
        initial: {},
        hover: {},
    }

    const childVariants1 = {
        initial: { x: -120, y: 158, opacity: 0 },
        hover: { x: 0, y: 0, opacity: 1 },
    };

    const childVariants2 = {
        initial: { rotate: 0 },
        hover: { rotate: 45 },
    };

    const childVariants3 = {
        initial: { scale: 0, opacity: 1, backgroundColor: "#9a42c6" },
        hover: { scale: 1 },
    };

    const textColorVariants = {
        initial: {
            opacity: 1,
            color: "#212A63"
        },
        hover: {
            opacity: [0, 1],
            color: ["#212A63", "white"],
        }
    };

    const gradientOverlayVariants = {
        initial: { opacity: 0 },
        hover: { opacity: 1 },
    };

    return (
        <motion.div initial="initial" whileHover="hover" variants={parentVariants}>
            <div className={cn("relative h-80 bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] flex flex-col items-start gap-5 rounded-3xl px-4 py-6 lg:px-6 lg:py-8 inter-font text-[#212A63] overflow-hidden", className)}>
                {title && <motion.h2 variants={textColorVariants} transition={{ duration: 0.5 }} className={cn("z-10 font-semibold text-xl md:text-2xl lg:text-3xl", titleClassName)}>{title}</motion.h2>}
                {
                    description && (
                        typeof description === 'string' ? (
                            <motion.p variants={textColorVariants} transition={{ duration: 0.5 }} className={cn("z-10 font-medium text-sm", descriptionClassName)}>{description}</motion.p>
                        ) :
                            <motion.div variants={textColorVariants} transition={{ duration: 0.5 }} className={cn("z-10 font-medium text-sm", descriptionClassName)}>{description}</motion.div>
                    )
                }
                <motion.div variants={textColorVariants} transition={{ duration: 0.5 }} className="z-10 font-medium text-sm">
                    {children}
                </motion.div>
                <motion.div variants={childVariants3} transition={{ duration: 0.5 }} className={cn("absolute bottom-10 right-10 w-[1500px] h-[1500px] rounded-[100%] translate-x-1/2 translate-y-1/2", animatedOverlayClassName)}> { /* rounded-full */}
                    <motion.div
                        className="absolute inset-0 z-0 rounded-[100%]" // rounded-full
                        style={{
                            background: "linear-gradient(to bottom, #2EAC25, #768E74)",
                        }}
                        variants={gradientOverlayVariants}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
                <motion.div variants={childVariants1} transition={{ duration: 0.5 }} className="absolute bottom-0">
                    <Image src="/icon/forg.png" width={117} height={117} alt="forg" />
                </motion.div>
                <motion.div variants={childVariants2} transition={{ duration: 0.5 }} className="absolute bottom-5 right-5 w-7 h-7 border-5 border-white bg-[#2A6C4B]" />
            </div>
        </motion.div>
    )
}

export default AnimatedCard;