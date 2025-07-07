import { cn } from "@/lib/utils";

const SwiperSlideContainer = ({ activeIndex, className, children }) => {
    return (
        <div className="flex flex-col">
            <div className={cn("flex justify-center items-start", className)}>
                {children}
            </div>
            {/* <ButtonsNavigation activeIndex={activeIndex} /> */}
        </div>

    )
}

export default SwiperSlideContainer;