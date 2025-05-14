import { useRouter } from 'next/router';

import { cn } from "@/lib/utils";
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import IconButton from "../common/Button";
import YouTubeBanner from '../common/YouTubeBanner';

const QuestEnd = ({
    className,
}) => {
    const { resetAll } = useQuestionnaire();
    const router = useRouter();

    const handleonClickBtn = () => {
        router.push("/safety");
        setTimeout(() => resetAll(), 1000);
    }

    return (
        <div className={cn("flex flex-col items-center lg:gap-7 gap-5 text-white merriweather-font font-medium", className)}>
            <YouTubeBanner className="w-full md:w-9/10 xl:w-3/4" />
            <div className="mt-10">
                <IconButton title="Start your Journey" onClick={handleonClickBtn} iconAnimate={false} />
            </div>
        </div>
    )
}

export default QuestEnd;