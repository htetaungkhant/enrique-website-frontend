import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step21 = ({
    className,
}) => {
    const { step21, setStep21 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">21.</span>
                    <h4>Would you rather attend a private retreat or a small group retreat?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step21 === "Fully private retreat"} title="Fully private retreat" onClick={() => setStep21("Fully private retreat")} />
                <AnswersBtn selected={step21 === "Small group retreat"} title="Small group retreat" onClick={() => setStep21("Small group retreat")} />
                <AnswersBtn selected={step21 === "I am not sure yet"} title="I am not sure yet" onClick={() => setStep21("I am not sure yet")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step21;