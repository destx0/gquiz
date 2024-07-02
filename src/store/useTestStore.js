import { create } from "zustand";

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
	calculateScores: () => {
		return (state) => {
			const { questions, selectedOptions } = state;

			if (!questions || questions.length === 0) {
				return {
					sectionScores: [],
					totalScore: 0,
					totalQuestions: 0,
				};
			}

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

				const answered = selectedOptions[sectionIndex].filter(
					(option) => option !== null
				).length;

				return {
					section: section.section,
					score: sectionScore,
					totalQuestions: section.questions.length,
					answered,
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
		};
	},
}));

export default useTestStore;
