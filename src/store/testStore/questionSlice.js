export const questionSlice = (set, get) => ({
	questions: [],
	selectedOptions: [],
	visitedQuestions: [],
	flaggedQuestions: [],

	initializeQuestions: (questions) =>
		set({
			questions,
			selectedOptions: questions.map((section) =>
				new Array(section.questions.length).fill(null)
			),
			visitedQuestions: questions.map((section) =>
				new Array(section.questions.length).fill(false)
			),
			flaggedQuestions: questions.map((section) =>
				new Array(section.questions.length).fill(false)
			),
		}),

	handleOptionSelect: (sectionIndex, questionIndex, optionIndex) =>
		set((state) => {
			const newSelectedOptions = [...state.selectedOptions];
			newSelectedOptions[sectionIndex] = [
				...newSelectedOptions[sectionIndex],
			];
			newSelectedOptions[sectionIndex][questionIndex] = optionIndex;
			return { selectedOptions: newSelectedOptions };
		}),

	markQuestionAsVisited: () =>
		set((state) => {
			const newVisitedQuestions = [...state.visitedQuestions];
			if (
				!Array.isArray(newVisitedQuestions[state.currentSectionIndex])
			) {
				newVisitedQuestions[state.currentSectionIndex] = [];
			}
			newVisitedQuestions[state.currentSectionIndex] = [
				...newVisitedQuestions[state.currentSectionIndex],
			];
			newVisitedQuestions[state.currentSectionIndex][
				state.currentQuestionIndex
			] = true;
			return { visitedQuestions: newVisitedQuestions };
		}),

	markForReview: (sectionIndex, questionIndex) =>
		set((state) => {
			const newFlaggedQuestions = [...state.flaggedQuestions];
			newFlaggedQuestions[sectionIndex] = [
				...newFlaggedQuestions[sectionIndex],
			];
			newFlaggedQuestions[sectionIndex][questionIndex] =
				!newFlaggedQuestions[sectionIndex][questionIndex];
			return { flaggedQuestions: newFlaggedQuestions };
		}),
});
