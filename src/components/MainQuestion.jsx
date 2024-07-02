import React from "react";
import Question from "@/components/Question";

const MainQuestion = ({
	currentSectionIndex,
	currentQuestionIndex,
	questions,
	selectedOptions,
	handleOptionSelect,
}) => {
	const currentQuestion =
		questions[currentSectionIndex]?.questions[currentQuestionIndex];

	if (!currentQuestion) {
		return <div>Loading...</div>;
	}

	const selectedOptionIndex =
		selectedOptions[currentSectionIndex]?.[currentQuestionIndex] ?? null;

	const onSelectOption = (index) => {
		handleOptionSelect(currentSectionIndex, currentQuestionIndex, index);
	};

	return (
		<Question
			question={currentQuestion.question}
			options={currentQuestion.options}
			selectedOptionIndex={selectedOptionIndex}
			onSelectOption={onSelectOption}
		/>
	);
};

export default MainQuestion;
