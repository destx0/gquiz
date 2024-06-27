import React from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaTimesCircle, FaStar } from "react-icons/fa";

const QuestionControls = ({
	currentQuestionIndex,
	currentSectionIndex,
	questions,
	setCurrentQuestionIndex,
	unmarkQuestion,
	markForReview,
}) => {
	const currentSection = questions[currentSectionIndex];

	return (
		<div className="shadow-md p-4 fixed bottom-0 w-full">
			<div className="space-x-4 flex justify-start">
				<Button
					onClick={() =>
						setCurrentQuestionIndex(currentQuestionIndex + 1)
					}
					disabled={
						currentQuestionIndex ===
						currentSection.questions.length - 1
					}
					className="flex items-center space-x-2"
				>
					<span>Next</span>
					<FaArrowRight />
				</Button>
				<Button
					onClick={() =>
						unmarkQuestion(
							currentSectionIndex,
							currentQuestionIndex
						)
					}
					variant="outline"
					className="flex items-center space-x-2"
				>
					<FaTimesCircle />
					<span>Clear Response</span>
				</Button>
				<Button
					onClick={() =>
						markForReview(currentSectionIndex, currentQuestionIndex)
					}
					variant="outline"
					className="flex items-center space-x-2"
				>
					<FaStar className="text-yellow-500" />
					<span>Mark/Unmark for Review</span>
				</Button>
			</div>
		</div>
	);
};

export default QuestionControls;
