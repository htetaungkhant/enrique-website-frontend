import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";
import Rating from "../Rating";

const Step3 = ({
    className,
}) => {
    const { step3, setStep3 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">3.</span>
                    <h4>How strong is your sense of spiritual connection?</h4>
                </div>
            </div>
            <Rating value={step3} onChange={setStep3} />
        </QuestionaireCard>
    )
}

export default Step3;