import create from "zustand";

const useTestStore = create((set) => ({
	currentSectionIndex: 0,
	currentQuestionIndex: 0,
	selectedOptions: [],
	visitedQuestions: [],
	flaggedQuestions: [],
	showNavigation: false,
	initializeQuestions: (questions) => {
		set({
			selectedOptions: questions.map((section) =>
				Array(section.questions.length).fill(null)
			),
			visitedQuestions: questions.map((section) =>
				Array(section.questions.length).fill(false)
			),
			flaggedQuestions: questions.map((section) =>
				Array(section.questions.length).fill(false)
			),
		});
	},
	setCurrentSectionIndex: (index) =>
		set({ currentSectionIndex: index, currentQuestionIndex: 0 }),
	setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
	handleOptionSelect: (index) =>
		set((state) => {
			const newSelectedOptions = state.selectedOptions.map(
				(section, sIndex) =>
					sIndex === state.currentSectionIndex
						? section.map((opt, qIndex) =>
								qIndex === state.currentQuestionIndex
									? index
									: opt
						  )
						: section
			);
			return { selectedOptions: newSelectedOptions };
		}),
	unmarkQuestion: (sectionIndex, questionIndex) =>
		set((state) => {
			const newSelectedOptions = state.selectedOptions.map(
				(section, sIndex) =>
					sIndex === sectionIndex
						? section.map((opt, qIndex) =>
								qIndex === questionIndex ? null : opt
						  )
						: section
			);
			return { selectedOptions: newSelectedOptions };
		}),
	markForReview: (sectionIndex, questionIndex) =>
		set((state) => {
			const newFlaggedQuestions = state.flaggedQuestions.map(
				(section, sIndex) =>
					sIndex === sectionIndex
						? section.map((flag, qIndex) =>
								qIndex === questionIndex ? !flag : flag
						  )
						: section
			);
			return { flaggedQuestions: newFlaggedQuestions };
		}),
	jumpToQuestion: (sectionIndex, questionIndex) =>
		set({
			currentSectionIndex: sectionIndex,
			currentQuestionIndex: questionIndex,
		}),
	setShowNavigation: (show) => set({ showNavigation: show }),
	markQuestionAsVisited: () =>
		set((state) => {
			const newVisitedQuestions = state.visitedQuestions.map(
				(section, sIndex) =>
					sIndex === state.currentSectionIndex
						? section.map((visited, qIndex) =>
								qIndex === state.currentQuestionIndex
									? true
									: visited
						  )
						: section
			);
			return { visitedQuestions: newVisitedQuestions };
		}),
}));

export default useTestStore;
