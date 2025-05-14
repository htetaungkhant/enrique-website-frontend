import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";
import Rating from "../Rating";

const Step6 = ({
    className,
}) => {
    const { step6, setStep6 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">6.</span>
                    <h4>How much love do you feel is present in your life?</h4>
                </div>
            </div>
            <Rating value={step6} onChange={setStep6} />
        </QuestionaireCard>
    )
}

export default Step6;