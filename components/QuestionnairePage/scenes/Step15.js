import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step15 = ({
    className,
}) => {
    const { step15, setStep15 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">15.</span>
                    <h4>What is your main reason for seeking to work with plant medicines?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step15 === "Healing / Trauma"} title="Healing / Trauma" onClick={() => setStep15("Healing / Trauma")} />
                <AnswersBtn selected={step15 === "Performance optimization"} title="Performance optimization" onClick={() => setStep15("Performance optimization")} />
                <AnswersBtn selected={step15 === "Consciousness expansion"} title="Consciousness expansion" onClick={() => setStep15("Consciousness expansion")} />
                <AnswersBtn selected={step15 === "Creative expression"} title="Creative expression" onClick={() => setStep15("Creative expression")} />
                <AnswersBtn selected={step15 === "Podcast"} title="Podcast" onClick={() => setStep15("Podcast")} />
                <AnswersBtn selected={step15 === "Media or publication"} title="Media or publication" onClick={() => setStep15("Media or publication")} />
                <AnswersBtn selected={step15 === "Other"} title="Other" onClick={() => setStep15("Other")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step15;