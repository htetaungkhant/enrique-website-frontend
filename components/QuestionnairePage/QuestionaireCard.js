import { cn } from "@/lib/utils";

const QuestionaireCard = ({
    className,
    children
}) => {
    return (
        <div className={cn("max-h-[50vh] overflow-y-auto xl:max-w-250 xl:min-w-200 md:min-w-150 sm:min-w-120 min-w-72 w-fit px-5 py-4 md:px-10 md:py-8 xl:px-16 xl:py-12 rounded-xl bg-[#1F1F1F] text-white inter-font [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", className)}>
            <div className="flex flex-col gap-5 lg:gap-8">
                {children}
            </div>
        </div>
    )
}

export default QuestionaireCard;