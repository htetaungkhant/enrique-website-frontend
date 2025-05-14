import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";

const Step30 = ({
    className,
}) => {
    const { step30, setStep30 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">30.</span>
                    <h4>Your Current Time Zone:</h4>
                </div>
            </div>
            <input
                value={step30 || ''}
                onChange={(e) => setStep30(e.target.value)}
                placeholder="Type Here..."
                className="p-2 xl:px-5 xl:py-3 rounded-xl outline-none max-xs:text-sm text-black bg-white placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium"
            />
        </QuestionaireCard>
    )
}

export default Step30;