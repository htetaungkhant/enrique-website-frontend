import { cn } from "@/lib/utils";
import QuestionaireCard from "../QuestionaireCard";
import AnswersBtn from "../AnswersBtn";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const Step13 = ({
    className,
}) => {
    const { step13, setStep13 } = useQuestionnaire();

    return (
        <QuestionaireCard className={cn("", className)}>
            <div className="text-base md:text-xl font-medium">
                <h4>13. Which all-inclusive Plant Medicine retreat interests you the most?</h4>
                <p className="md:pl-10 text-sm md:text-lg text-gray-300">(Please note: Due to legal restrictions, Behold does not offer Plant Medicine Ceremonies or Retreats in the United States or Canada).</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
                <AnswersBtn selected={step13 === "Ayahuasca in Costa Rica"} title="Ayahuasca in Costa Rica" onClick={() => setStep13("Ayahuasca in Costa Rica")} />
                <AnswersBtn selected={step13 === "Ayahuasca in Mexico"} title="Ayahuasca in Mexico" onClick={() => setStep13("Ayahuasca in Mexico")} />
                <AnswersBtn selected={step13 === "Ayahuasca in Portugal"} title="Ayahuasca in Portugal" onClick={() => setStep13("Ayahuasca in Portugal")} />
                <AnswersBtn selected={step13 === "5 MeO DMT / Bufo in Mexico"} title="5 MeO DMT / Bufo in Mexico" onClick={() => setStep13("5 MeO DMT / Bufo in Mexico")} />
                <AnswersBtn selected={step13 === "5 MeO DMT / Bufo in Portugal"} title="5 MeO DMT / Bufo in Portugal" onClick={() => setStep13("5 MeO DMT / Bufo in Portugal")} />
                <AnswersBtn selected={step13 === "Psilocybin in Costal Rica"} title="Psilocybin in Costal Rica" onClick={() => setStep13("Psilocybin in Costal Rica")} />
                <AnswersBtn selected={step13 === "Psilocybin in Portugal"} title="Psilocybin in Portugal" onClick={() => setStep13("Psilocybin in Portugal")} />
                <AnswersBtn selected={step13 === "Ayahuasca Eco-Retreat in Costa Rica"} title="Ayahuasca Eco-Retreat in Costa Rica" onClick={() => setStep13("Ayahuasca Eco-Retreat in Costa Rica")} />
            </div>
        </QuestionaireCard>
    )
}

export default Step13;