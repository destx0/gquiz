import React from "react";
import { Button } from "@/components/ui/button";

const QuestionNavigation = ({
	numberOfQuestions,
	currentQuestionIndex,
	jumpToQuestion,
	selectedOptions,
	visitedQuestions,
}) => {
	return (
		<div className="grid grid-cols-5 gap-2">
			{Array.from({ length: numberOfQuestions }).map((_, index) => {
				const isSelected = selectedOptions[index] !== null;
				const isVisited = visitedQuestions[index];
				const isActive = currentQuestionIndex === index;

				let bgColor = "bg-red-500"; // Not Visited
				if (isActive) {
					bgColor = "bg-blue-500"; // Active
				} else if (isSelected) {
					bgColor = "bg-green-500"; // Answered
				} else if (isVisited) {
					bgColor = "bg-yellow-500"; // Visited but not answered
				}

				return (
					<Button
						key={index}
						onClick={() => jumpToQuestion(index)}
						className={`w-10 h-10 text-xs ${bgColor} ${
							isActive ? "border-2 border-black" : ""
						}`}
					>
						{index + 1}
					</Button>
				);
			})}
		</div>
	);
};

export default QuestionNavigation;
