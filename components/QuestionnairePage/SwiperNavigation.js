import { toast } from 'react-toastify';
import { useSwiper } from "swiper/react";

import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import { IconButton } from "@/components/common/Button";

const SwiperNavigation = ({ activeIndex, onGobackToFirst, onSubmit }) => {
    const activeIdx = activeIndex + 1;

    const {
        step1,
        step2,
        step3,
        step4,
        step5,
        step6,
        step7,
        step8,
        step9,
        step10,
        step11,
        step12,
        step13,
        step14,
        step15,
        step16,
        step17,
        step18,
        step19,
        step20,
        step21,
        step22,
        step23,
        step24,
        step25,
        step26,
        step27,
        step28,
        step29,
        step30,
        step31,
        setStart,
        resetAll,
        /*
        resetAllStep,
        resetOverStep1,
        resetOverStep2,
        resetOverStep3,
        resetOverStep4,
        resetOverStep5,
        resetOverStep6,
        resetOverStep7,
        resetOverStep8,
        resetOverStep9,
        resetOverStep10,
        resetOverStep11,
        resetOverStep12,
        resetOverStep13,
        resetOverStep14,
        resetOverStep15,
        resetOverStep16,
        resetOverStep17,
        resetOverStep18,
        resetOverStep19,
        resetOverStep20,
        resetOverStep21,
        resetOverStep22,
        resetOverStep23,
        resetOverStep24,
        resetOverStep25,
        resetOverStep26,
        resetOverStep27,
        resetOverStep28,
        resetOverStep29,
        resetOverStep30,
        */
    } = useQuestionnaire();
    const swiper = useSwiper();

    const handlePrevious = () => {
        /*
        if (activeIdx === 31) resetOverStep30();
        else if (activeIdx === 30) resetOverStep29();
        else if (activeIdx === 29) resetOverStep28();
        else if (activeIdx === 28) resetOverStep27();
        else if (activeIdx === 27) resetOverStep26();
        else if (activeIdx === 26) resetOverStep25();
        else if (activeIdx === 25) resetOverStep24();
        else if (activeIdx === 24) resetOverStep23();
        else if (activeIdx === 23) resetOverStep22();
        else if (activeIdx === 22) resetOverStep21();
        else if (activeIdx === 21) resetOverStep20();
        else if (activeIdx === 20) resetOverStep19();
        else if (activeIdx === 19) resetOverStep18();
        else if (activeIdx === 18) resetOverStep17();
        else if (activeIdx === 16) resetOverStep15();
        else if (activeIdx === 17) resetOverStep16();
        else if (activeIdx === 15) resetOverStep14();
        else if (activeIdx === 14) resetOverStep13();
        else if (activeIdx === 13) resetOverStep12();
        else if (activeIdx === 12) resetOverStep11();
        else if (activeIdx === 11) resetOverStep10();
        else if (activeIdx === 10) resetOverStep9();
        else if (activeIdx === 9) resetOverStep8();
        else if (activeIdx === 8) resetOverStep7();
        else if (activeIdx === 7) resetOverStep6();
        else if (activeIdx === 6) resetOverStep5();
        else if (activeIdx === 5) resetOverStep4();
        else if (activeIdx === 4) resetOverStep3();
        else if (activeIdx === 3) resetOverStep2();
        else if (activeIdx === 2) resetOverStep1();
        else if (activeIdx === 1) resetAllStep();
        */
        if (activeIdx === 1) {
            if (onGobackToFirst) {
                resetAll();
                onGobackToFirst();
            }
            return;
        }

        swiper?.slidePrev()
    }

    const handleNext = () => {
        const selectBoxErrorMessage = "Please select one!";
        const ratingErrorMessage = "Please give us rating!";
        const inputBoxErrorMessage = "Please fill the input!";
        const emailErrorMessage = "Please enter a valid email address!";

        if (activeIdx === 1) {
            if (step1 === null) {
                toast.error(selectBoxErrorMessage);
                return;
            }
            else {
                setStart(true);
            }
        }
        else if (activeIdx === 2 && step2 === null) {
            toast.error(ratingErrorMessage);
            return;
        }
        else if (activeIdx === 3 && step3 === null) {
            toast.error(ratingErrorMessage);
            return;
        }
        else if (activeIdx === 4 && step4 === null) {
            toast.error(ratingErrorMessage);
            return;
        }
        else if (activeIdx === 5 && step5 === null) {
            toast.error(ratingErrorMessage);
            return;
        }
        else if (activeIdx === 6 && step6 === null) {
            toast.error(ratingErrorMessage);
            return;
        }
        else if (activeIdx === 7 && step7 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 8 && !step8) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 9 && !step9) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 10 && !step10) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 11 && step11 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 12 && step12 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 13 && step13 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 14 && step14 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 15 && step15 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 16 && step16 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 17 && step17 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 18 && !step18) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 19 && !step19) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 20 && step20 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 21 && step21 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 22 && !step22) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 23 && !step23) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 24 && !step24) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 25) {
            if (!step25) {
                toast.error(inputBoxErrorMessage);
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step25)) {
                toast.error(emailErrorMessage);
                return;
            }
        }
        else if (activeIdx === 26 && (!step26 || !step26?.value?.replace(step26?.dialCode, ""))) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 27 && step27 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 28 && step28 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 29 && step29 === null) {
            toast.error(selectBoxErrorMessage);
            return;
        }
        else if (activeIdx === 30 && !step30) {
            toast.error(inputBoxErrorMessage);
            return;
        }
        else if (activeIdx === 31) {
            if (!step31) {
                toast.error(inputBoxErrorMessage);
            }
            else {
                if (onSubmit) onSubmit();
            }
            return;
        }


        swiper?.slideNext()
    }

    return (
        <>
            {
                swiper && (
                    <div className="flex justify-center gap-5 mt-10">
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