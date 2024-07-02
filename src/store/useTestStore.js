import { create } from "zustand";

const useTestStore = create((set) => ({
	currentSectionIndex: 0,
	currentQuestionIndex: 0,
	selectedOptions: [],
	visitedQuestions: [],
	flaggedQuestions: [],
	questions: [],
	showNavigation: false,

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

	setCurrentSectionIndex: (index) =>
		set({ currentSectionIndex: index, currentQuestionIndex: 0 }),

	setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

	markQuestionAsVisited: () =>
		set((state) => {
			const newVisitedQuestions = [...state.visitedQuestions];
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

	setShowNavigation: (show) => set({ showNavigation: show }),

	calculateScores: () => (state) => {
		const { questions, selectedOptions } = state;

		const scores = questions.map((section, sectionIndex) => {
			const sectionScore = section.questions.reduce(
				(score, question, questionIndex) => {
					const selectedOptionIndex =
						selectedOptions[sectionIndex][questionIndex];
					if (selectedOptionIndex === question.answerIndex) {
						return score + 1;
					}
					return score;
				},
				0
			);

			return {
				section: section.section,
				score: sectionScore,
				totalQuestions: section.questions.length,
				answered: selectedOptions[sectionIndex].filter(
					(option) => option !== null
				).length,
			};
		});

		const totalScore = scores.reduce(
			(total, section) => total + section.score,
			0
		);
		const totalQuestions = scores.reduce(
			(total, section) => total + section.totalQuestions,
			0
		);

		return {
			sectionScores: scores,
			totalScore,
			totalQuestions,
		};
	},
}));

export default useTestStore;
