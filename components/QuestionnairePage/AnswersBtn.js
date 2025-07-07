import { cn } from "@/lib/utils";

const AnswersBtn = ({
    title,
    selected,
    className,
    ...props
}) => {
    return (
        <button className={cn("px-2 py-1 text-sm md:px-4 md:py-2 bg-gradient-to-b from-[#00000080] to-[#1c389678] border-1 border-black rounded-md cursor-pointer", selected && "border-white", className)} {...props}>
            {title}
        </button>
    )
}

export default AnswersBtn;