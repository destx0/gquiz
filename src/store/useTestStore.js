import { create } from "zustand";

const useTestStore = create((set, get) => ({
	questions: [],
	currentSectionIndex: 0,
	currentQuestionIndex: 0,
	selectedOptions: [],
	visitedQuestions: [],
	flaggedQuestions: [],
	showNavigation: false,
	questionTimers: [],

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
			questionTimers: questions.map((section) =>
				new Array(section.questions.length).fill(60000)
			), // 60 seconds for each question
		}),

	setCurrentSectionIndex: (index) =>
		set({ currentSectionIndex: index, currentQuestionIndex: 0 }),

	setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

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

	setShowNavigation: (show) => set({ showNavigation: show }),

	updateQuestionTimer: (sectionIndex, questionIndex, remainingTime) =>
		set((state) => {
			const newQuestionTimers = [...state.questionTimers];
			newQuestionTimers[sectionIndex] = [
				...newQuestionTimers[sectionIndex],
			];
			newQuestionTimers[sectionIndex][questionIndex] = remainingTime;
			return { questionTimers: newQuestionTimers };
		}),

	getRemainingTime: (sectionIndex, questionIndex) => {
		const state = get();
		return state.questionTimers[sectionIndex][questionIndex];
	},

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
			return {}; // If it's the last question of the last section, don't change anything
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
			return {}; // If it's the first question of the first section, don't change anything
		}),

	calculateScores: () => {
		const state = get();
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

	resetQuiz: () =>
		set((state) => ({
			currentSectionIndex: 0,
			currentQuestionIndex: 0,
			selectedOptions: state.questions.map((section) =>
				new Array(section.questions.length).fill(null)
			),
			visitedQuestions: state.questions.map((section) =>
				new Array(section.questions.length).fill(false)
			),
			flaggedQuestions: state.questions.map((section) =>
				new Array(section.questions.length).fill(false)
			),
			questionTimers: state.questions.map((section) =>
				new Array(section.questions.length).fill(60000)
			),
		})),
}));

export default useTestStore;
