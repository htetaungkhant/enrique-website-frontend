import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";

const Step19 = ({
    className,
}) => {
    const { step19, setStep19 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">19.</span>
                    <h4>Have you encountered any significant mental or physical health issues in the past five years? If so, please provide details.</h4>
                </div>
            </div>
            <input
                value={step19 || ''}
                onChange={(e) => setStep19(e.target.value)}
                placeholder="Type Here..."
                className="p-2 xl:px-5 xl:py-3 rounded-xl outline-none max-xs:text-sm text-black bg-white placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium"
            />
        </QuestionaireCard>
    )
}

export default Step19;