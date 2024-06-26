import React from "react";
import { Button } from "@/components/ui/button";

const QuestionControls = ({
	currentQuestionIndex,
	currentSectionIndex,
	questions,
	setCurrentQuestionIndex,
	unmarkQuestion,
}) => {
	const currentSection = questions[currentSectionIndex];

	return (
		<div className="bg-gray-200 p-4 flex justify-between items-center fixed bottom-0 w-full">
			<div className="flex space-x-4">
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

export default QuestionControls;
