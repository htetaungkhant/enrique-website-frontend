import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step12 = ({
    className,
}) => {
    const { step12, setStep12 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">12.</span>
                    <h4>How old are you?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step12 === "Below 21"} title="Below 21" onClick={() => setStep12("Below 21")} />
                <AnswersBtn selected={step12 === "21-26"} title="21-26" onClick={() => setStep12("21-26")} />
                <AnswersBtn selected={step12 === "27-35"} title="27-35" onClick={() => setStep12("27-35")} />
                <AnswersBtn selected={step12 === "36-45"} title="36-45" onClick={() => setStep12("36-45")} />
                <AnswersBtn selected={step12 === "46-54"} title="46-54" onClick={() => setStep12("46-54")} />
                <AnswersBtn selected={step12 === "55 or older"} title="55 or older" onClick={() => setStep12("55 or older")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step12;