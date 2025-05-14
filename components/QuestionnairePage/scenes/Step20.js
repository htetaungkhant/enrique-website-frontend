import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step20 = ({
    className,
}) => {
    const { step20, setStep20 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">20.</span>
                    <h4>Do you think coaching or therapy could support you in preparing for and integrating your retreat experience?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step20 === "Yes"} title="Yes" onClick={() => setStep20("Yes")} />
                <AnswersBtn selected={step20 === "No"} title="No" onClick={() => setStep20("No")} />
                <AnswersBtn selected={step20 === "I don’t know yet"} title="I don’t know yet" onClick={() => setStep20("I don’t know yet")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step20;