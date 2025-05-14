import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";

const Step8 = ({
    className,
}) => {
    const { step8, setStep8 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">8.</span>
                    <h4>Take 3 slow, deep breaths… With a clear and calm mind, what is your genuine motivation for seeking a retreat?</h4>
                </div>
            </div>
            <input
                value={step8 || ''}
                onChange={(e) => setStep8(e.target.value)}
                placeholder="Type Here..."
                className="p-2 xl:px-5 xl:py-3 rounded-xl outline-none max-xs:text-sm text-black bg-white placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium"
            />
        </QuestionaireCard>
    )
}

export default Step8;