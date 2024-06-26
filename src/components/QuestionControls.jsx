import React from "react";
import { Button } from "@/components/ui/button";
import {
	FaArrowLeft,
	FaArrowRight,
	FaTimesCircle,
	FaRegFlag,
} from "react-icons/fa";

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
		<div className="bg-gray-100 p-4 fixed bottom-0 w-full">
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
					<span>Unmark</span>
				</Button>
				<Button
					onClick={() =>
						markForReview(currentSectionIndex, currentQuestionIndex)
					}
					variant="outline"
					className="flex items-center space-x-2"
				>
					<FaRegFlag />
					<span>Mark for Review{markForReview }</span>
				</Button>
			</div>
		</div>
	);
};

export default QuestionControls;
