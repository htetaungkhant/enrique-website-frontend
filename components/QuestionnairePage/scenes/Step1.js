import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";

const Step1 = ({
    className,
}) => {
    const { step1, setStep1 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">1.</span>
                    <h4>How are you feeling right now as a starting point?</h4>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                <AnswersBtn selected={step1 === 1} onClick={() => setStep1(1)} title="I’m in great health" />
                <AnswersBtn selected={step1 === 2} onClick={() => setStep1(2)} title="I’m pretty healthy" />
                <AnswersBtn selected={step1 === 3} onClick={() => setStep1(3)} title="I’m doing ok" />
                <AnswersBtn selected={step1 === 4} onClick={() => setStep1(4)} title="I’m ready to improve" />
            </div>
        </QuestionaireCard>
    )
}

export default Step1;