import React from "react";
import { Button } from "@/components/ui/button";
import { FaFlag } from "react-icons/fa";

const QuestionNavigation = ({
	numberOfQuestions,
	currentQuestionIndex,
	jumpToQuestion,
	selectedOptions,
	visitedQuestions,
	flaggedQuestions,
}) => {
	return (
		<div className="grid grid-cols-5 gap-2">
			{Array.from({ length: numberOfQuestions }).map((_, index) => {
				const isSelected = selectedOptions
					? selectedOptions[index] !== null
					: false;
				const isVisited = visitedQuestions
					? visitedQuestions[index]
					: false;
				const isFlagged = flaggedQuestions
					? flaggedQuestions[index]
					: false;
				const isActive = currentQuestionIndex === index;

				let bgColor = "bg-red-500"; // Not Visited
				if (isActive) {
					bgColor = "bg-blue-500"; // Active
				} else if (isSelected) {
					bgColor = "bg-green-500"; // Answered
				} else if (isVisited) {
					bgColor = "bg-yellow-500"; // Visited but not answered
				}
				if (isFlagged) {
					bgColor = "bg-purple-500"; // Flagged
				}
				return (
					<Button
						key={index}
						onClick={() => jumpToQuestion(index)}
						className={`relative w-10 h-10 text-xs ${bgColor} ${
							isActive ? "border-2 border-black" : ""
						}`}
					>
						{index + 1}
						{isFlagged && (
							<FaFlag className="absolute top-1 right-1 text-white" />
						)}
					</Button>
				);
			})}
		</div>
	);
};

export default QuestionNavigation;
