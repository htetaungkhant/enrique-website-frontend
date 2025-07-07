import { useSelector, useDispatch } from 'react-redux';

import {
    setStart,
    setEnd,
    setActiveIndex,
    setAnswers,
    resetAllAnswers,
    resetAll,
} from '@/store/questionnaireSlice';

export function useQuestionnaire() {
    const start = useSelector((state) => state.questionnaire.start);
    const end = useSelector((state) => state.questionnaire.end);
    const activeIndex = useSelector((state) => state.questionnaire.activeIndex);
    const answers = useSelector((state) => state.questionnaire.answers);

    const dispatch = useDispatch();

    return {
        start,
        end,
        activeIndex,
        answers,
        setStart: (flag) => dispatch(setStart(flag)),
        setEnd: (flag) => dispatch(setEnd(flag)),
        setActiveIndex: (index) => dispatch(setActiveIndex(index)),
        setAnswers: (step, questionId, questionType, answer, arrayAnswer) => dispatch(setAnswers({ step, questionId, questionType, answer, arrayAnswer })),
        resetAllAnswers: () => dispatch(resetAllAnswers()),
        resetAll: () => dispatch(resetAll()),
    }
}