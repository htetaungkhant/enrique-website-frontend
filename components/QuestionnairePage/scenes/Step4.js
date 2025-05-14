import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";
import Rating from "../Rating";

const Step4 = ({
    className,
}) => {
    const { step4, setStep4 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">4.</span>
                    <h4>How peaceful do you feel?</h4>
                </div>
            </div>
            <Rating value={step4} onChange={setStep4} />
        </QuestionaireCard>
    )
}

export default Step4;