export const timerSlice = (set, get) => ({
	questionTimers: [],

	initializeTimers: (questions) =>
		set({
			questionTimers: questions.map((section) =>
				new Array(section.questions.length).fill(0)
			),
		}),

	updateQuestionTimer: (sectionIndex, questionIndex, elapsedTime) =>
		set((state) => {
			const newQuestionTimers = [...state.questionTimers];
			if (!newQuestionTimers[sectionIndex]) {
				newQuestionTimers[sectionIndex] = [];
			}
			if (!newQuestionTimers[sectionIndex][questionIndex]) {
				newQuestionTimers[sectionIndex][questionIndex] = 0;
			}
			newQuestionTimers[sectionIndex][questionIndex] = elapsedTime;
			return { questionTimers: newQuestionTimers };
		}),

	getElapsedTime: (sectionIndex, questionIndex) => {
		const state = get();
		if (!state.questionTimers || !state.questionTimers[sectionIndex]) {
			return 0;
		}
		return state.questionTimers[sectionIndex][questionIndex] || 0;
	},
	questionTimers: {},
	updateQuestionTimer: (sectionIndex, questionIndex, time) =>
		set((state) => ({
			questionTimers: {
				...state.questionTimers,
				[`${sectionIndex}-${questionIndex}`]: time,
			},
		})),
});
