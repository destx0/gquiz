import React from "react";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";

const QuestionNavigation = ({
	numberOfQuestions,
	currentQuestionIndex,
	jumpToQuestion,
	selectedOptions,
	visitedQuestions,
	flaggedQuestions,
}) => {
	return (
		<div>
			<div className="grid grid-cols-4 gap-6 p-4">
				{Array.from({ length: numberOfQuestions }).map((_, index) => {
					const isSelected = selectedOptions[index] !== null;
					const isVisited = visitedQuestions[index];
					const isFlagged = flaggedQuestions[index];
					const isActive = currentQuestionIndex === index;

					let bgColor = "bg-gray-500"; // Not Visited
					if (isSelected && isFlagged) {
						bgColor = "bg-purple-500"; // Marked and Answered
					} else if (isSelected) {
						bgColor = "bg-green-500"; // Answered
					} else if (isFlagged) {
						bgColor = "bg-purple-500"; // Marked
					} else if (isVisited) {
						bgColor = "bg-red-500"; // Visited but not answered
					}

					return (
						<Button
							key={index}
							onClick={() => jumpToQuestion(index)}
							className={`w-10 h-10 text-xxs text-white relative ${bgColor} ${
								isActive ? "border-4 border-black" : "shadow-md"
							}`}
						>
							{isSelected && isFlagged && (
								<FaCheck className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 text-green-500" />
							)}
							{index + 1}
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionNavigation;
