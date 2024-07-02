export const navigationSlice = (set, get) => ({
	currentSectionIndex: 0,
	currentQuestionIndex: 0,
	showNavigation: false,

	setCurrentSectionIndex: (index) =>
		set({ currentSectionIndex: index, currentQuestionIndex: 0 }),

	setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

	jumpToQuestion: (sectionIndex, questionIndex) =>
		set({
			currentSectionIndex: sectionIndex,
			currentQuestionIndex: questionIndex,
		}),

	moveToNextQuestion: () =>
		set((state) => {
			const currentSection = state.questions[state.currentSectionIndex];
			if (
				state.currentQuestionIndex <
				currentSection.questions.length - 1
			) {
				return { currentQuestionIndex: state.currentQuestionIndex + 1 };
			} else if (state.currentSectionIndex < state.questions.length - 1) {
				return {
					currentSectionIndex: state.currentSectionIndex + 1,
					currentQuestionIndex: 0,
				};
			}
			return {};
		}),

	moveToPreviousQuestion: () =>
		set((state) => {
			if (state.currentQuestionIndex > 0) {
				return { currentQuestionIndex: state.currentQuestionIndex - 1 };
			} else if (state.currentSectionIndex > 0) {
				const previousSection =
					state.questions[state.currentSectionIndex - 1];
				return {
					currentSectionIndex: state.currentSectionIndex - 1,
					currentQuestionIndex: previousSection.questions.length - 1,
				};
			}
			return {};
		}),

	setShowNavigation: (show) => set({ showNavigation: show }),
});
