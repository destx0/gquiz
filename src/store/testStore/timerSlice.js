export const timerSlice = (set, get) => ({
	questionTimers: {},
	totalTimeInMinutes: 60,
	positiveMarks: 1,
	negativeMarks: 0,
	totalTimeTaken: 0,
	globalTimeRemaining: null,
	timersAreFrozen: false,

	initializeTimers: (questions, totalTime, posMarks, negMarks) =>
		set((state) => ({
			questionTimers: questions.reduce((acc, section, sectionIndex) => {
				section.questions.forEach((_, questionIndex) => {
					acc[`${sectionIndex}-${questionIndex}`] = 0;
				});
				return acc;
			}, {}),
			totalTimeInMinutes: totalTime || 60,
			positiveMarks: posMarks || 1,
			negativeMarks: negMarks || 0,
			totalTimeTaken: 0,
			globalTimeRemaining: totalTime * 60,
		})),

	updateQuestionTimer: (sectionIndex, questionIndex, elapsedTime) =>
		set((state) => ({
			questionTimers: {
				...state.questionTimers,
				[`${sectionIndex}-${questionIndex}`]: elapsedTime,
			},
		})),

	setTotalTimeTaken: (timeTaken) => set({ totalTimeTaken: timeTaken }),

	updateGlobalTimeRemaining: () =>
		set((state) => ({
			globalTimeRemaining: Math.max(state.globalTimeRemaining - 1, 0),
		})),

	getElapsedTime: (sectionIndex, questionIndex) => {
		const state = get();
		return state.questionTimers[`${sectionIndex}-${questionIndex}`] || 0;
	},

	getTotalTime: () => get().totalTimeInMinutes,
	getTotalTimeTaken: () => get().totalTimeTaken,
	getGlobalTimeRemaining: () => get().globalTimeRemaining,
	getPositiveMarks: () => get().positiveMarks,
	getNegativeMarks: () => get().negativeMarks,

	freezeAllTimers: () => set({ timersAreFrozen: true }),
	areTimersFrozen: () => get().timersAreFrozen,
});
