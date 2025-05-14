import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";
import Rating from "../Rating";

const Step5 = ({
    className,
}) => {
    const { step5, setStep5 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">5.</span>
                    <h4>When you feel aligned with your purpose, life tends to flow more smoothly. How connected do you currently feel to your purpose?</h4>
                </div>
            </div>
            <Rating value={step5} onChange={setStep5} />
        </QuestionaireCard>
    )
}

export default Step5;