import React from "react";
import Question from "@/components/Question";

const MainQuestion = ({
	currentSectionIndex,
	currentQuestionIndex,
	questions,
	selectedOptions,
	handleOptionSelect,
}) => {
	const currentSection = questions[currentSectionIndex];
	const currentQuestion = currentSection.questions[currentQuestionIndex];

	return (
		<div className="flex-1 p-4">
			<h1 className="text-2xl font-bold mb-4">
				Question No. {currentQuestionIndex + 1}
			</h1>
			<Question
				question={currentQuestion.question}
				options={currentQuestion.options}
				selectedOptionIndex={
					selectedOptions[currentSectionIndex][currentQuestionIndex]
				}
				onSelectOption={handleOptionSelect}
			/>
		</div>
	);
};

export default MainQuestion;
