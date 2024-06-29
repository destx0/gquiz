import React from "react";
import { Button } from "@/components/ui/button";
import {
	FaArrowRight,
	FaTimesCircle,
	FaStar,
	FaPaperPlane,
} from "react-icons/fa";
import { PostSubmit } from "@/components/PostSubmit";

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
		<div className="shadow-md p-4 fixed bottom-0 w-full gap-4 bg-muted shadow-xl flex justify-between items-center overflow-x-auto">
			<div className="flex space-x-4 ">
				<Button
					onClick={() =>
						unmarkQuestion(
							currentSectionIndex,
							currentQuestionIndex
						)
					}
					variant="outline"
					className="flex items-center space-x-2 shadow-lg"
				>
					<FaTimesCircle />
					<span>Clear Response</span>
				</Button>
				<Button
					onClick={() =>
						markForReview(currentSectionIndex, currentQuestionIndex)
					}
					variant="outline"
					className="flex items-center space-x-2 shadow-lg"
				>
					<FaStar className="text-yellow-500" />
					<span>Mark/Unmark for Review</span>
				</Button>
				<Button
					onClick={() =>
						setCurrentQuestionIndex(currentQuestionIndex + 1)
					}
					disabled={
						currentQuestionIndex ===
						currentSection.questions.length - 1
					}
					className="flex items-center space-x-2 shadow-lg"
				>
					<span>Next</span>
					<FaArrowRight />
				</Button>
			</div>
			<Button className="flex items-center space-x-2 bg-primary text-white shadow-lg">
				<FaPaperPlane />
				<PostSubmit />
			</Button>
		</div>
	);
};

export default QuestionControls;
