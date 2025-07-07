import { cn } from "@/lib/utils";
import { IconButton } from "../common/Button";
import YouTubeBanner from '../common/YouTubeBanner';

const QuestEnd = ({
    className,
}) => {

    return (
        <div className={cn("flex flex-col items-center lg:gap-7 gap-5 text-white merriweather-font font-medium", className)}>
            <YouTubeBanner href="https://youtu.be/GcjK7eRr1u4?si=fP9UQDfusVPFfYFM" className="w-full md:w-9/10 xl:w-3/4" />
            <div className="mt-10 flex gap-x-5">
                <IconButton className="w-33" title="Home" href="/" reverseIconPosition={true} iconAnimate={false} />

                <IconButton title="View More" href="/safety" iconAnimate={false} />
            </div>
        </div>
    )
}

export default QuestEnd;