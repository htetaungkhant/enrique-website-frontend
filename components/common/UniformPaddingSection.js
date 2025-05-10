import { cn } from "@/lib/utils";

const UPSection = ({ className, style, children }) => {
    return (
        <section className={cn("px-6 py-6 lg:px-12 lg:py-12", className)} style={style}>{children}</section>
    )
}

export default UPSection;