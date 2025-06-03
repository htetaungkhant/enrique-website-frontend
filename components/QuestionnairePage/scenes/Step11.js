import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step11 = ({
    className,
}) => {
    const { step11, setStep11 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">11.</span>
                    <h4>Do you currently experience any of the following mental health conditions: dissociative disorder, bipolar disorder, schizophrenia, or multiple personality disorder?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step11 === "yes"} title="Yes" onClick={() => setStep11("yes")} />
                <AnswersBtn selected={step11 === "no"} title="No" onClick={() => setStep11("no")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step11;