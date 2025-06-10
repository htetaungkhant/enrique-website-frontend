import { cn } from "@/lib/utils";
import { IconButton } from "../common/Button";
import YouTubeBanner from '../common/YouTubeBanner';

const QuestEnd = ({
    className,
}) => {

    return (
        <div className={cn("flex flex-col items-center lg:gap-7 gap-5 text-white merriweather-font font-medium", className)}>
            <YouTubeBanner className="w-full md:w-9/10 xl:w-3/4" />
            <div className="mt-10">
                <IconButton title="Start your Journey" href="/safety" iconAnimate={false} />
            </div>
        </div>
    )
}

export default QuestEnd;