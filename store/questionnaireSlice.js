import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    start: false,
    end: false,
    activeIndex: 0,
    answers: {},
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
        setAnswers: (state, action) => {
            const { step, questionId, questionType, answer, arrayAnswer } = action.payload;
            if (step && answer !== undefined) {
                state.answers[step] = { questionId, questionType, answer, arrayAnswer };
            }
        },
        resetAllAnswers: (state) => {
            state.answers = {};
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
    setAnswers,
    resetAllAnswers,
    resetAll,
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;