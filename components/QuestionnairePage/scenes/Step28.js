import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step28 = ({
    className,
}) => {
    const { step28, setStep28 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">28.</span>
                    <h4>We will reach out to you via text. If we don’t receive a response within 1-2 days, would you like us to follow up with a phone call to schedule a Discovery Call?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step28 === "yes"} title="Yes" onClick={() => setStep28("yes")} />
                <AnswersBtn selected={step28 === "no"} title="Not" onClick={() => setStep28("no")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step28;