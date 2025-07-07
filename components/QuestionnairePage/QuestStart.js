import { cn } from "@/lib/utils";
import { IconButton } from "../common/Button";

const QuestStart = ({
    onStart,
    className,
}) => {

    return (
        <div className={cn("max-h-[50vh] -mt-28 flex flex-col items-center lg:gap-7 gap-5 text-white merriweather-font font-medium", className)}>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl text-center">To ensure a safe, supportive, and transformative retreat experience, <br />we connect with every guest before extending an invitation.</h2>
            <p className="text-center text-lg">Complete a few quick questions to request your complimentary Consultation Session today.</p>
            <div className="mt-8 md:mt-12">
                <IconButton title="Begin your Journey" onClick={onStart} />
            </div>
        </div>
    )
}

export default QuestStart;