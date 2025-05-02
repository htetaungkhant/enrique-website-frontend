import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const Card = ({ badgeText, children, className, twBadgeBorderColor = "border-[#022645]", twBadgeTextColor = "text-[#022645]", twBadgeBgColor, animate = false }) => {
    const variants = {
        initial: animate ? { rotate: 0 } : undefined,
        hover: animate ? {
            rotate: [0, -1, 1, -1, 1, 0],
            transition: {
                duration: 0.4,
                ease: 'easeInOut',
            }
        } : undefined
        ,
    };

    return (
        <motion.div
            initial={animate ? "initial" : undefined}
            whileHover={
                animate ? "hover" : undefined
            }
            variants={variants}
            className={cn("relative bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] flex flex-col items-start gap-5 rounded-3xl px-4 py-6 lg:px-6 lg:py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", className)}
        >
            {badgeText && <span className={`${twBadgeBgColor} block ${twBadgeBorderColor} border-[1px] rounded-4xl px-4 py-1 inter-font font-medium ${twBadgeTextColor} text-xs md:text-base`}>{badgeText}</span>}
            {children}
        </motion.div>
    );
}

export default Card;