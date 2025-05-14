import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    start: false,
    end: false,
    activeIndex: 0,
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
    step6: null,
    step7: null,
    step8: null,
    step9: null,
    step10: null,
    step11: null,
    step12: null,
    step13: null,
    step14: null,
    step15: null,
    step16: null,
    step17: null,
    step18: null,
    step19: null,
    step20: null,
    step21: null,
    step22: null,
    step23: null,
    step24: null,
    step25: null,
    step26: null,
    step27: null,
    step28: null,
    step29: null,
    step30: null,
    step31: null,
}

const questionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState,
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload;
        },
        setEnd: (state, action) => {
            state.end = action.payload;
        },
        setActiveIndex: (state, action) => {
            state.activeIndex = action.payload;
        },
        setStep1: (state, action) => {
            state.step1 = action.payload;
        },
        setStep2: (state, action) => {
            state.step2 = action.payload;
        },
        setStep3: (state, action) => {
            state.step3 = action.payload;
        },
        setStep4: (state, action) => {
            state.step4 = action.payload;
        },
        setStep5: (state, action) => {
            state.step5 = action.payload;
        },
        setStep6: (state, action) => {
            state.step6 = action.payload;
        },
        setStep7: (state, action) => {
            state.step7 = action.payload;
        },
        setStep8: (state, action) => {
            state.step8 = action.payload;
        },
        setStep9: (state, action) => {
            state.step9 = action.payload;
        },
        setStep10: (state, action) => {
            state.step10 = action.payload;
        },
        setStep11: (state, action) => {
            state.step11 = action.payload;
        },
        setStep12: (state, action) => {
            state.step12 = action.payload;
        },
        setStep13: (state, action) => {
            state.step13 = action.payload;
        },
        setStep14: (state, action) => {
            state.step14 = action.payload;
        },
        setStep15: (state, action) => {
            state.step15 = action.payload;
        },
        setStep16: (state, action) => {
            state.step16 = action.payload;
        },
        setStep17: (state, action) => {
            state.step17 = action.payload;
        },
        setStep18: (state, action) => {
            state.step18 = action.payload;
        },
        setStep19: (state, action) => {
            state.step19 = action.payload;
        },
        setStep20: (state, action) => {
            state.step20 = action.payload;
        },
        setStep21: (state, action) => {
            state.step21 = action.payload;
        },
        setStep22: (state, action) => {
            state.step22 = action.payload;
        },
        setStep23: (state, action) => {
            state.step23 = action.payload;
        },
        setStep24: (state, action) => {
            state.step24 = action.payload;
        },
        setStep25: (state, action) => {
            state.step25 = action.payload;
        },
        setStep26: (state, action) => {
            state.step26 = action.payload;
        },
        setStep27: (state, action) => {
            state.step27 = action.payload;
        },
        setStep28: (state, action) => {
            state.step28 = action.payload;
        },
        setStep29: (state, action) => {
            state.step29 = action.payload;
        },
        setStep30: (state, action) => {
            state.step30 = action.payload;
        },
        setStep31: (state, action) => {
            state.step31 = action.payload;
        },
        resetOverStep1: (state) => {
            state.step2 = null;
            state.step3 = null;
            state.step4 = null;
            state.step5 = null;
            state.step6 = null;
            state.step7 = null;
            state.step8 = null;
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep2: (state) => {
            state.step3 = null;
            state.step4 = null;
            state.step5 = null;
            state.step6 = null;
            state.step7 = null;
            state.step8 = null;
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep3: (state) => {
            state.step4 = null;
            state.step5 = null;
            state.step6 = null;
            state.step7 = null;
            state.step8 = null;
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep4: (state) => {
            state.step5 = null;
            state.step6 = null;
            state.step7 = null;
            state.step8 = null;
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep5: (state) => {
            state.step6 = null;
            state.step7 = null;
            state.step8 = null;
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep6: (state) => {
            state.step7 = null;
            state.step8 = null;
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep7: (state) => {
            state.step8 = null;
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep8: (state) => {
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep9: (state) => {
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep10: (state) => {
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep11: (state) => {
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep12: (state) => {
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep13: (state) => {
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep14: (state) => {
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep15: (state) => {
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep16: (state) => {
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep17: (state) => {
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep18: (state) => {
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep19: (state) => {
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep20: (state) => {
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep21: (state) => {
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep22: (state) => {
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep23: (state) => {
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep24: (state) => {
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep25: (state) => {
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep26: (state) => {
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep27: (state) => {
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep28: (state) => {
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep29: (state) => {
            state.step30 = null;
            state.step31 = null;
        },
        resetOverStep30: (state) => {
            state.step31 = null;
        },
        resetAllStep: (state) => {
            state.step1 = null;
            state.step2 = null;
            state.step3 = null;
            state.step4 = null;
            state.step5 = null;
            state.step6 = null;
            state.step7 = null;
            state.step8 = null;
            state.step9 = null;
            state.step10 = null;
            state.step11 = null;
            state.step12 = null;
            state.step13 = null;
            state.step14 = null;
            state.step15 = null;
            state.step16 = null;
            state.step17 = null;
            state.step18 = null;
            state.step19 = null;
            state.step20 = null;
            state.step21 = null;
            state.step22 = null;
            state.step23 = null;
            state.step24 = null;
            state.step25 = null;
            state.step26 = null;
            state.step27 = null;
            state.step28 = null;
            state.step29 = null;
            state.step30 = null;
            state.step31 = null;
        },
        resetAll: (state) => {
            return { ...initialState }
        }
    }
});

export const {
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
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;