import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";

const Step31 = ({
    className,
}) => {
    const { step31, setStep31 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">31.</span>
                    <h4>When would you like to schedule a Discovery Call with one of our guides? * <br />(Please share a few preferred days and times.)</h4>
                </div>
            </div>
            <input
                value={step31 || ''}
                onChange={(e) => setStep31(e.target.value)}
                placeholder="Type Here..."
                className="p-2 xl:px-5 xl:py-3 rounded-xl outline-none text-black bg-white placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium"
            />
        </QuestionaireCard>
    )
}

export default Step31;