import { toast } from "sonner";
import { useSwiper } from "swiper/react";

import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import { IconButton } from "@/components/common/Button";
import { getQuestionaireErrorMessage, isPhoneValid } from "@/lib/utils";

const SwiperNavigation = ({ activeIndex, surveys, onGobackToFirst, onSubmit }) => {
    const activeIdx = activeIndex + 1;

    const {
        answers, // [ 1: { questionId, questionType, answer, arrayAnswer } ]
        setStart,
        resetAll,
    } = useQuestionnaire();
    const swiper = useSwiper();

    const handlePrevious = () => {
        if (activeIdx === 1) {
            resetAll();
            if (onGobackToFirst) {
                onGobackToFirst();
            }
            return;
        }

        swiper?.slidePrev()
    }

    const submitSurveyAnswer = async (questionId, answer, arrayAnswer, idx) => {
        if (!questionId || (!answer && (!arrayAnswer || (Array.isArray(arrayAnswer) && arrayAnswer.length === 0)))) return;

        const body = {
            questionId,
            answer: answer ? answer.toString() : undefined,
            arrayAnswer,
        };
        try {
            const response = await fetch('/api/submit-survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to submit survey answer for question ${idx}`);
            }

            toast.success(`Survey answer submitted successfully for question ${idx}`);
            return data;
        } catch (error) {
            toast.error(error.message || `Failed to submit survey answer for question ${idx}`);
            return null;
        }
    }

    const handleNext = async () => {
        if (activeIdx === 1) {
            if (!answers[1]?.answer && (!answers[1]?.arrayAnswer || (Array.isArray(answers[1]?.arrayAnswer) && answers[1]?.arrayAnswer.length === 0))) {
                toast.error(getQuestionaireErrorMessage(surveys[activeIndex]?.questionType));
                return;
            }

            const submitResult = await submitSurveyAnswer(answers[1]?.questionId, answers[1]?.answer, answers[1]?.arrayAnswer, activeIdx);
            if (submitResult) {
                setStart(true);
                swiper?.slideNext();
            }
            return;
        } else if (activeIdx === surveys.length) {
            if (!answers[activeIdx]?.answer && (!answers[activeIdx]?.arrayAnswer || (Array.isArray(answers[activeIdx]?.arrayAnswer) && answers[activeIdx]?.arrayAnswer.length === 0))) {
                toast.error(getQuestionaireErrorMessage(surveys[activeIndex]?.questionType));
                return;
            }

            const submitResult = await submitSurveyAnswer(answers[activeIdx]?.questionId, answers[activeIdx]?.answer, answers[activeIdx]?.arrayAnswer, activeIdx);
            if (submitResult) {
                onSubmit?.(); // if (onSubmit) onSubmit();
            }
            return;
        } else {
            const stepAnswer = answers[activeIdx];
            if (surveys[activeIndex]?.questionType === "email") {
                const errorMessage = getQuestionaireErrorMessage(surveys[activeIndex]?.questionType);
                if (!stepAnswer?.answer) {
                    toast.error(errorMessage);
                    return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (stepAnswer?.answer && !emailRegex.test(stepAnswer?.answer)) {
                    toast.error(errorMessage);
                    return;
                }

                const submitResult = await submitSurveyAnswer(stepAnswer?.questionId, stepAnswer?.answer, stepAnswer?.arrayAnswer, activeIdx);
                if (submitResult) {
                    swiper?.slideNext();
                }
                return;
            }
            else if (surveys[activeIndex]?.questionType === "phone") {
                const errorMessage = getQuestionaireErrorMessage(surveys[activeIndex]?.questionType);
                if (!stepAnswer?.answer || !stepAnswer?.answer?.value?.replace(stepAnswer?.answer?.dialCode, "")) { // (!step26 || !step26?.value?.replace(step26?.dialCode, ""))
                    toast.error(errorMessage);
                    return;
                }

                if (!isPhoneValid(stepAnswer?.answer?.value?.replace(stepAnswer?.answer?.dialCode, ""), stepAnswer?.answer?.dialCode)) {
                    toast.error(errorMessage);
                    return;
                }

                const submitResult = await submitSurveyAnswer(stepAnswer?.questionId, stepAnswer?.answer?.value?.replace(stepAnswer?.answer?.dialCode, ""), stepAnswer?.arrayAnswer, activeIdx);
                if (submitResult) {
                    swiper?.slideNext();
                }
                return;
            }
            else {
                if (!stepAnswer?.answer && (!stepAnswer?.arrayAnswer || (Array.isArray(stepAnswer?.arrayAnswer) && stepAnswer?.arrayAnswer.length === 0))) {
                    toast.error(getQuestionaireErrorMessage(surveys[activeIndex]?.questionType));
                    return;
                }

                const submitResult = await submitSurveyAnswer(stepAnswer?.questionId, stepAnswer?.answer, stepAnswer?.arrayAnswer, activeIdx);
                if (submitResult) {
                    swiper?.slideNext();
                }
                return;
            }
        }
    }

    return (
        <>
            {
                swiper && (
                    <div className="flex justify-center gap-5 mt-5">
                        <IconButton className="w-33" title="Previous" onClick={handlePrevious} reverseIconPosition={true} iconAnimate={false} />
                        {
                            activeIdx === 31 ?
                                <IconButton className="w-33" title="Submit" onClick={handleNext} iconAnimate={false} />
                                :
                                <IconButton className="w-33" title="Next" onClick={handleNext} iconAnimate={false} />
                        }
                    </div>
                )
            }
        </>
    )
}

export default SwiperNavigation;