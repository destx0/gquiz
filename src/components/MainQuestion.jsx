import React from "react";
import { Button } from "@/components/ui/button";
import Question from "@/components/Question";

const MainQuestion = ({
	currentSectionIndex,
	currentQuestionIndex,
	questions,
	selectedOptions,
	handleOptionSelect,
	setCurrentQuestionIndex,
	unmarkQuestion,
}) => {
	const currentSection = questions[currentSectionIndex];
	const currentQuestion = currentSection.questions[currentQuestionIndex];

	return (
		<div className="flex-1 p-4">
			<h1 className="text-2xl font-bold mb-4">
				{currentSection.section} - Question No.{" "}
				{currentQuestionIndex + 1}
			</h1>
			<Question
				question={currentQuestion.question}
				options={currentQuestion.options}
				selectedOptionIndex={
					selectedOptions[currentSectionIndex][currentQuestionIndex]
				}
				onSelectOption={handleOptionSelect}
			/>
			<div className="mt-4 flex space-x-4">
				<Button
					onClick={() =>
						setCurrentQuestionIndex(currentQuestionIndex - 1)
					}
					disabled={currentQuestionIndex === 0}
				>
					Previous
				</Button>
				<Button
					onClick={() =>
						setCurrentQuestionIndex(currentQuestionIndex + 1)
					}
					disabled={
						currentQuestionIndex ===
						currentSection.questions.length - 1
					}
				>
					Next
				</Button>
				<Button
					onClick={() =>
						unmarkQuestion(
							currentSectionIndex,
							currentQuestionIndex
						)
					}
					variant="outline"
				>
					Unmark
				</Button>
			</div>
		</div>
	);
};

export default MainQuestion;
