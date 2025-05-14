import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step16 = ({
    className,
}) => {
    const { step16, setStep16 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">16.</span>
                    <h4>How long have you been thinking about trying a psychedelic plant medicine experience?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step16 === "< 1 Month "} title="< 1 Month " onClick={() => setStep16("< 1 Month ")} />
                <AnswersBtn selected={step16 === "2-5 Months"} title="2-5 Months" onClick={() => setStep16("2-5 Months")} />
                <AnswersBtn selected={step16 === "6-12 Months"} title="6-12 Months" onClick={() => setStep16("6-12 Months")} />
                <AnswersBtn selected={step16 === "12-24 Months"} title="12-24 Months" onClick={() => setStep16("12-24 Months")} />
                <AnswersBtn selected={step16 === "2+ Years"} title="2+ Years" onClick={() => setStep16("2+ Years")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step16;