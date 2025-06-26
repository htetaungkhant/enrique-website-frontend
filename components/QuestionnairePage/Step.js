import { cn } from "@/lib/utils";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import { PhoneNumberInput } from "@/components/common/Input";
import CustomTimezoneSelect from '@/components/common/TimezoneSelect';
import QuestionaireCard from "./QuestionaireCard";
import AnswersBtn from "./AnswersBtn";
import Rating from "./Rating";

const Step = ({
    idx,
    survey,
    className,
}) => {
    const { answers, setAnswers } = useQuestionnaire();

    return (
        <QuestionaireCard
            className={cn(
                survey?.questionType === "phone" ? "overflow-y-visible" : "",
                className
            )}
        >
            <div className="text-base md:text-xl font-medium">
                <div className="flex">
                    <span className="pr-2">{idx}</span>
                    <h4>{survey?.question}</h4>
                </div>
            </div>
            {
                survey?.questionType === "single_choice" && (
                    survey?.options && Array.isArray(survey.options) && survey.options.length > 0 && (
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-wrap gap-x-5 gap-y-3">
                                {
                                    survey.options.map((option, index) => (
                                        <AnswersBtn
                                            key={index}
                                            selected={answers[idx]?.answer === option || (answers[idx]?.answer?.toString()?.toLowerCase()?.startsWith("others=>") && option?.toString()?.toLowerCase()?.startsWith("others"))}
                                            onClick={() => setAnswers(
                                                idx,
                                                survey.id,
                                                survey.questionType,
                                                option,
                                            )}
                                            title={option}
                                        />
                                    ))
                                }
                            </div>
                            {answers[idx]?.answer?.toString()?.toLowerCase()?.includes("others") && (
                                <input
                                    value={
                                        answers[idx]?.answer?.toString()?.toLowerCase()?.startsWith("others=>")
                                            ? answers[idx]?.answer?.toString()?.replace("Others=>", "")
                                            : answers[idx]?.answer?.toString()?.toLowerCase()?.startsWith("others")
                                                ? answers[idx]?.answer?.toString()?.replace("Others", "")
                                                : ''
                                    }
                                    onChange={(e) => setAnswers(
                                        idx,
                                        survey.id,
                                        survey.questionType,
                                        `Others=>${e.target.value}`
                                    )}
                                    placeholder="Type Here..."
                                    className="p-2 xl:px-5 xl:py-3 rounded-xl outline-none max-xs:text-sm text-black bg-white placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium"
                                />
                            )}
                        </div>
                    )
                )
            }
            {
                survey?.questionType === "multiple_choice" && (
                    survey?.options && Array.isArray(survey.options) && survey.options.length > 0 && (
                        <div className="flex flex-wrap gap-x-5 gap-y-3">
                            {
                                survey.options.map((option, index) => (
                                    <AnswersBtn
                                        key={index}
                                        selected={answers[idx]?.arrayAnswer?.includes(option)}
                                        onClick={() => setAnswers(
                                            idx,
                                            survey.id,
                                            survey.questionType,
                                            null,
                                            answers[idx]?.arrayAnswer?.includes(option)
                                                ? answers[idx]?.arrayAnswer.filter((ans) => ans !== option)
                                                : [...(answers[idx]?.arrayAnswer || []), option]
                                        )}
                                        title={option}
                                    />
                                ))
                            }
                        </div>
                    )
                )
            }
            {
                survey?.questionType === "rating" && (
                    <Rating
                        value={answers[idx]?.answer}
                        onChange={(value) => setAnswers(
                            idx,
                            survey.id,
                            survey.questionType,
                            value
                        )}
                    />
                )
            }
            {
                survey?.questionType === "text" && (
                    <input
                        value={answers[idx]?.answer || ''}
                        onChange={(e) => setAnswers(
                            idx,
                            survey.id,
                            survey.questionType,
                            e.target.value
                        )}
                        placeholder="Type Here..."
                        className="p-2 xl:px-5 xl:py-3 rounded-xl outline-none max-xs:text-sm text-black bg-white placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium"
                    />
                )
            }
            {
                survey?.questionType === "email" && (
                    <input
                        value={answers[idx]?.answer || ''}
                        type="email"
                        onChange={(e) => setAnswers(
                            idx,
                            survey.id,
                            survey.questionType,
                            e.target.value
                        )}
                        placeholder="Type Here..."
                        className="p-2 xl:px-5 xl:py-3 rounded-xl outline-none max-xs:text-sm text-black bg-white placeholder:text-gray-600 placeholder:text-sm placeholder:font-medium"
                    />
                )
            }
            {
                survey?.questionType === "phone" && (
                    <PhoneNumberInput
                        value={answers[idx]?.answer?.value || ''}
                        onChange={(value, data, event, formattedValue) => setAnswers(
                            idx,
                            survey.id,
                            survey.questionType,
                            {
                                value,
                                dialCode: data.dialCode,
                                formattedValue,
                            },
                        )}
                        customPlaceholder="Type Here..."
                        className="rounded-xl md:p-2 bg-white"
                    />
                )
            }
            {
                survey?.questionType === "time_zone" && (
                    <CustomTimezoneSelect
                        value={answers[idx]?.answer || ''}
                        onChange={(timezone) => {
                            setAnswers(
                                idx,
                                survey.id,
                                survey.questionType,
                                timezone.value,
                            )
                        }}
                    />
                )
            }
        </QuestionaireCard>
    )
}

export default Step;