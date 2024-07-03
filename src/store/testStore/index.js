import { create } from "zustand";
import { questionSlice } from "./questionSlice";
import { navigationSlice } from "./navigationSlice";
import { timerSlice } from "./timerSlice";
import { scoreSlice } from "./scoreSlice";

const useTestStore = create((set, get) => {
	const questionMethods = questionSlice(set, get);
	const navigationMethods = navigationSlice(set, get);
	const timerMethods = timerSlice(set, get);
	const scoreMethods = scoreSlice(set, get);

	return {
		...questionMethods,
		...navigationMethods,
		...timerMethods,
		...scoreMethods,
		quizMetadata: {},
		quizStartTime: null,
		initializeQuestions: questionMethods.initializeQuestions,
		initializeTimers: timerMethods.initializeTimers,
		initializeQuizMetadata: (metadata) => set({ quizMetadata: metadata }),
		getQuizMetadata: () => get().quizMetadata,
		setQuizStartTime: (startTime) => set({ quizStartTime: startTime }),
		getQuizStartTime: () => get().quizStartTime,
	};
});

export default useTestStore;
