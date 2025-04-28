import { cn } from "@/lib/utils";

const Card = ({ badgeText, children, className, twBadgeBorderColor = "border-[#022645]", twBadgeTextColor = "text-[#022645]", twBadgeBgColor }) => {

    return (
        <div className={cn("relative bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] flex flex-col items-start gap-5 rounded-3xl px-4 py-6 lg:px-6 lg:py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", className)}>
            {badgeText && <span className={`${twBadgeBgColor} block ${twBadgeBorderColor} border-[1px] rounded-4xl px-4 py-1 inter-font font-medium ${twBadgeTextColor} text-xs md:text-base`}>{badgeText}</span>}
            {children}
        </div>
    );
}

export default Card;