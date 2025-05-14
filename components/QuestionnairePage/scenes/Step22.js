import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";

const Step22 = ({
    className,
}) => {
    const { step22, setStep22 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">22.</span>
                    <h4>Is there anything else you’d like to share with us about yourself, such as your life situation, dietary requirements, specific needs, or preferences?</h4>
                </div>
            </div>
            <input
                value={step22 || ''}
                onChange={(e) => setStep22(e.target.value)}
                placeholder="Type Here..."
                className="p-2 xl:px-5 xl:py-3 rounded-xl outline-none max-xs:text-sm text-black bg-white placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium"
            />
        </QuestionaireCard>
    )
}

export default Step22;