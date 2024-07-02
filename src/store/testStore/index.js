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
		initializeTest: (questions) => {
			questionMethods.initializeQuestions(questions);
			timerMethods.initializeTimers(questions);
		},
	};
});

export default useTestStore;
