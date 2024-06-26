import React from "react";
import { Button } from "@/components/ui/button";

const QuestionNavigation = ({
	numberOfQuestions,
	currentQuestionIndex,
	jumpToQuestion,
	selectedOptions,
}) => {
	return (
		<div className="flex flex-wrap gap-2">
			{Array.from({ length: numberOfQuestions }).map((_, index) => {
				const isSelected = selectedOptions[index] !== null;
				const isVisited =
					selectedOptions[index] === null &&
					index <= currentQuestionIndex;
				return (
					<Button
						key={index}
						onClick={() => jumpToQuestion(index)}
						variant={
							currentQuestionIndex === index ? "solid" : "outline"
						}
						className={`w-10 h-10 text-xs 
              ${isSelected ? "bg-green-500" : ""}
              ${isVisited ? "bg-yellow-500" : ""}
              ${!isSelected && !isVisited ? "bg-red-500" : ""}`}
					>
						{index + 1}
					</Button>
				);
			})}
		</div>
	);
};

export default QuestionNavigation;
