import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";
import { PhoneNumberInput } from "@/components/common/Input";

const Step26 = ({
    className,
}) => {
    const { step26, setStep26 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("overflow-visible", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">26.</span>
                    <h4>What mobile number is best to reach you?</h4>
                </div>
            </div>
            <PhoneNumberInput
                value={step26?.value || ''}
                onChange={(value, data) => setStep26({ value, dialCode: data.dialCode })}
                customPlaceholder="Type Here..."
                className="rounded-xl md:p-2 bg-white"
            />
        </QuestionaireCard>
    )
}

export default Step26;