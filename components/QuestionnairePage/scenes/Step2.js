import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";
import Rating from "../Rating";

const Step2 = ({
    className,
}) => {
    const { step2, setStep2 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">2.</span>
                    <h4>To what extent do you feel you are currently reaching your full potential?</h4>
                </div>
            </div>
            <Rating value={step2} onChange={setStep2} />
        </QuestionaireCard>
    )
}

export default Step2;