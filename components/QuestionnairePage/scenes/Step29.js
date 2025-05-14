import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step29 = ({
    className,
}) => {
    const { step29, setStep29 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">29.</span>
                    <h4>After reviewing your answers, we will send you a message. How would you like to be contacted? (Select all that apply)</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step29 === "Phone (U.S. and Canada)"} title="Phone (U.S. and Canada)" onClick={() => setStep29("Phone (U.S. and Canada)")} />
                <AnswersBtn selected={step29 === "WhatsApp"} title="WhatsApp" onClick={() => setStep29("WhatsApp")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step29;