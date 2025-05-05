import { cn } from "@/lib/utils";

const SearchBox = ({ className, ...props }) => {
    return (
        <input
            className={cn("px-4 py-1 lg:py-2 border-[1px] border-white rounded-3xl outline-none placeholder-white", className)}
            {...props}
        />
    )
}

export default SearchBox;