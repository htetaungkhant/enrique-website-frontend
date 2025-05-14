import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";

const Step7 = ({
    className,
}) => {
    const { step7, setStep7 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">7.</span>
                    <h4>To ensure we provide the best support, please take a moment to reflect and answer the following questions openly and honestly. <br />This will help us determine if we are the right fit to guide your healing and transformation.</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn
                    selected={step7 === "Sounds perfect!"}
                    onClick={() => setStep7("Sounds perfect!")}
                    title="Sounds perfect!"
                    className="md:pr-14"
                />
                <AnswersBtn
                    selected={step7 === "I'm not prepared for that."}
                    onClick={() => setStep7("I'm not prepared for that.")}
                    title="I'm not prepared for that."
                    className="md:pr-14"
                />
            </div>
        </QuestionaireCard>
    )
}

export default Step7;