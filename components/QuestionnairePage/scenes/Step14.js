import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step14 = ({
    className,
}) => {
    const { step14, setStep14 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">14.</span>
                    <h4>How did you find out about Bufo Retreats?</h4>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step14 === "From a Friend / Word of Mouth"} title="From a Friend / Word of Mouth" onClick={() => setStep14("From a Friend / Word of Mouth")} />
                <AnswersBtn selected={step14 === "Google or other search engine"} title="Google or other search engine" onClick={() => setStep14("Google or other search engine")} />
                <AnswersBtn selected={step14 === "Our blog"} title="Our blog" onClick={() => setStep14("Our blog")} />
                <AnswersBtn selected={step14 === "Social media"} title="Social media" onClick={() => setStep14("Social media")} />
                <AnswersBtn selected={step14 === "Podcast"} title="Podcast" onClick={() => setStep14("Podcast")} />
                <AnswersBtn selected={step14 === "Media or publication"} title="Media or publication" onClick={() => setStep14("Media or publication")} />
                <AnswersBtn selected={step14 === "Other"} title="Other" onClick={() => setStep14("Other")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step14;