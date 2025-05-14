import { useSelector, useDispatch } from 'react-redux';

import {
    setStart,
    setEnd,
    setActiveIndex,
    setStep1,
    setStep2,
    setStep3,
    setStep4,
    setStep5,
    setStep6,
    setStep7,
    setStep8,
    setStep9,
    setStep10,
    setStep11,
    setStep12,
    setStep13,
    setStep14,
    setStep15,
    setStep16,
    setStep17,
    setStep18,
    setStep19,
    setStep20,
    setStep21,
    setStep22,
    setStep23,
    setStep24,
    setStep25,
    setStep26,
    setStep27,
    setStep28,
    setStep29,
    setStep30,
    setStep31,
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
    resetAllStep,
    resetAll,
} from '@/store/questionnaireSlice';

export function useQuestionnaire() {
    const start = useSelector((state) => state.questionnaire.start);
    const end = useSelector((state) => state.questionnaire.end);
    const activeIndex = useSelector((state) => state.questionnaire.activeIndex);
    const step1 = useSelector((state) => state.questionnaire.step1);
    const step2 = useSelector((state) => state.questionnaire.step2);
    const step3 = useSelector((state) => state.questionnaire.step3);
    const step4 = useSelector((state) => state.questionnaire.step4);
    const step5 = useSelector((state) => state.questionnaire.step5);
    const step6 = useSelector((state) => state.questionnaire.step6);
    const step7 = useSelector((state) => state.questionnaire.step7);
    const step8 = useSelector((state) => state.questionnaire.step8);
    const step9 = useSelector((state) => state.questionnaire.step9);
    const step10 = useSelector((state) => state.questionnaire.step10);
    const step11 = useSelector((state) => state.questionnaire.step11);
    const step12 = useSelector((state) => state.questionnaire.step12);
    const step13 = useSelector((state) => state.questionnaire.step13);
    const step14 = useSelector((state) => state.questionnaire.step14);
    const step15 = useSelector((state) => state.questionnaire.step15);
    const step16 = useSelector((state) => state.questionnaire.step16);
    const step17 = useSelector((state) => state.questionnaire.step17);
    const step18 = useSelector((state) => state.questionnaire.step18);
    const step19 = useSelector((state) => state.questionnaire.step19);
    const step20 = useSelector((state) => state.questionnaire.step20);
    const step21 = useSelector((state) => state.questionnaire.step21);
    const step22 = useSelector((state) => state.questionnaire.step22);
    const step23 = useSelector((state) => state.questionnaire.step23);
    const step24 = useSelector((state) => state.questionnaire.step24);
    const step25 = useSelector((state) => state.questionnaire.step25);
    const step26 = useSelector((state) => state.questionnaire.step26);
    const step27 = useSelector((state) => state.questionnaire.step27);
    const step28 = useSelector((state) => state.questionnaire.step28);
    const step29 = useSelector((state) => state.questionnaire.step29);
    const step30 = useSelector((state) => state.questionnaire.step30);
    const step31 = useSelector((state) => state.questionnaire.step31);

    const dispatch = useDispatch();

    return {
        start,
        end,
        activeIndex,
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
        setStart: (flag) => dispatch(setStart(flag)),
        setEnd: (flag) => dispatch(setEnd(flag)),
        setActiveIndex: (index) => dispatch(setActiveIndex(index)),
        setStep1: (step1Data) => dispatch(setStep1(step1Data)),
        setStep2: (step2Data) => dispatch(setStep2(step2Data)),
        setStep3: (step3Data) => dispatch(setStep3(step3Data)),
        setStep4: (step4Data) => dispatch(setStep4(step4Data)),
        setStep5: (step5Data) => dispatch(setStep5(step5Data)),
        setStep6: (step6Data) => dispatch(setStep6(step6Data)),
        setStep7: (step7Data) => dispatch(setStep7(step7Data)),
        setStep8: (step8Data) => dispatch(setStep8(step8Data)),
        setStep9: (step9Data) => dispatch(setStep9(step9Data)),
        setStep10: (step10Data) => dispatch(setStep10(step10Data)),
        setStep11: (step11Data) => dispatch(setStep11(step11Data)),
        setStep12: (step12Data) => dispatch(setStep12(step12Data)),
        setStep13: (step13Data) => dispatch(setStep13(step13Data)),
        setStep14: (step14Data) => dispatch(setStep14(step14Data)),
        setStep15: (step15Data) => dispatch(setStep15(step15Data)),
        setStep16: (step16Data) => dispatch(setStep16(step16Data)),
        setStep17: (step17Data) => dispatch(setStep17(step17Data)),
        setStep18: (step18Data) => dispatch(setStep18(step18Data)),
        setStep19: (step19Data) => dispatch(setStep19(step19Data)),
        setStep20: (step20Data) => dispatch(setStep20(step20Data)),
        setStep21: (step21Data) => dispatch(setStep21(step21Data)),
        setStep22: (step22Data) => dispatch(setStep22(step22Data)),
        setStep23: (step23Data) => dispatch(setStep23(step23Data)),
        setStep24: (step24Data) => dispatch(setStep24(step24Data)),
        setStep25: (step25Data) => dispatch(setStep25(step25Data)),
        setStep26: (step26Data) => dispatch(setStep26(step26Data)),
        setStep27: (step27Data) => dispatch(setStep27(step27Data)),
        setStep28: (step28Data) => dispatch(setStep28(step28Data)),
        setStep29: (step29Data) => dispatch(setStep29(step29Data)),
        setStep30: (step30Data) => dispatch(setStep30(step30Data)),
        setStep31: (step31Data) => dispatch(setStep31(step31Data)),
        resetOverStep1: () => dispatch(resetOverStep1()),
        resetOverStep2: () => dispatch(resetOverStep2()),
        resetOverStep3: () => dispatch(resetOverStep3()),
        resetOverStep4: () => dispatch(resetOverStep4()),
        resetOverStep5: () => dispatch(resetOverStep5()),
        resetOverStep6: () => dispatch(resetOverStep6()),
        resetOverStep7: () => dispatch(resetOverStep7()),
        resetOverStep8: () => dispatch(resetOverStep8()),
        resetOverStep9: () => dispatch(resetOverStep9()),
        resetOverStep10: () => dispatch(resetOverStep10()),
        resetOverStep11: () => dispatch(resetOverStep11()),
        resetOverStep12: () => dispatch(resetOverStep12()),
        resetOverStep13: () => dispatch(resetOverStep13()),
        resetOverStep14: () => dispatch(resetOverStep14()),
        resetOverStep15: () => dispatch(resetOverStep15()),
        resetOverStep16: () => dispatch(resetOverStep16()),
        resetOverStep17: () => dispatch(resetOverStep17()),
        resetOverStep18: () => dispatch(resetOverStep18()),
        resetOverStep19: () => dispatch(resetOverStep19()),
        resetOverStep20: () => dispatch(resetOverStep20()),
        resetOverStep21: () => dispatch(resetOverStep21()),
        resetOverStep22: () => dispatch(resetOverStep22()),
        resetOverStep23: () => dispatch(resetOverStep23()),
        resetOverStep24: () => dispatch(resetOverStep24()),
        resetOverStep25: () => dispatch(resetOverStep25()),
        resetOverStep26: () => dispatch(resetOverStep26()),
        resetOverStep27: () => dispatch(resetOverStep27()),
        resetOverStep28: () => dispatch(resetOverStep28()),
        resetOverStep29: () => dispatch(resetOverStep29()),
        resetOverStep30: () => dispatch(resetOverStep30()),
        resetAllStep: () => dispatch(resetAllStep()),
        resetAll: () => dispatch(resetAll()),
    }
}