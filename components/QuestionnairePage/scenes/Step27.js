import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step27 = ({
    className,
}) => {
    const { step27, setStep27 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">27.</span>
                    <h4>Which platform do you primarily use for texting?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step27 === "Phone (U.S. and Canada Only)"} title="Phone (U.S. and Canada Only)" onClick={() => setStep27("Phone (U.S. and Canada Only)")} />
                <AnswersBtn selected={step27 === "WhatsApp"} title="WhatsApp" onClick={() => setStep27("WhatsApp")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step27;