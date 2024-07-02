export const scoreSlice = (set, get) => ({
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
});
