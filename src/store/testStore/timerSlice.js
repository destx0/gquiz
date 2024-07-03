export const timerSlice = (set, get) => ({
	questionTimers: {},
	totalTimeInMinutes: 60, // Default value, should be set during initialization
	positiveMarks: 1, // Default value, should be set during initialization
	negativeMarks: 0, // Default value, should be set during initialization

	initializeTimers: (questions, totalTime, posMarks, negMarks) =>
		set({
			questionTimers: questions.reduce((acc, section, sectionIndex) => {
				section.questions.forEach((_, questionIndex) => {
					acc[`${sectionIndex}-${questionIndex}`] = 0;
				});
				return acc;
			}, {}),
			totalTimeInMinutes: totalTime || 60,
			positiveMarks: posMarks || 1,
			negativeMarks: negMarks || 0,
		}),

	updateQuestionTimer: (sectionIndex, questionIndex, elapsedTime) =>
		set((state) => ({
			questionTimers: {
				...state.questionTimers,
				[`${sectionIndex}-${questionIndex}`]: elapsedTime,
			},
		})),

	getElapsedTime: (sectionIndex, questionIndex) => {
		const state = get();
		return state.questionTimers[`${sectionIndex}-${questionIndex}`] || 0;
	},

	getTotalTime: () => get().totalTimeInMinutes,
	getPositiveMarks: () => get().positiveMarks,
	getNegativeMarks: () => get().negativeMarks,
});
