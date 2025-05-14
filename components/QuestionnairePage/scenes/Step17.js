import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step17 = ({
    className,
}) => {
    const { step17, setStep17 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">17.</span>
                    <h4>If Bufo invites you to a retreat, when would be your preferred time to attend?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step17 === "ASAP"} title="ASAP" onClick={() => setStep17("ASAP")} />
                <AnswersBtn selected={step17 === "Within 3 months"} title="Within 3 months" onClick={() => setStep17("Within 3 months")} />
                <AnswersBtn selected={step17 === "Within 6 months"} title="Within 6 months" onClick={() => setStep17("Within 6 months")} />
                <AnswersBtn selected={step17 === "Within 1 years"} title="Within 1 years" onClick={() => setStep17("Within 1 years")} />
                <AnswersBtn selected={step17 === "Within 2 years"} title="Within 2 years" onClick={() => setStep17("Within 2 years")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step17;