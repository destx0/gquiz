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
			<div className="p-4">
				<div className="mb-4">
					<div className="flex items-center mb-2">
						<div className="w-4 h-4 bg-gray-500 inline-block mr-2"></div>
						<span>Not Visited</span>
					</div>
					<div className="flex items-center mb-2">
						<div className="w-4 h-4 bg-blue-500 inline-block mr-2"></div>
						<span>Active</span>
					</div>
					<div className="flex items-center mb-2">
						<div className="w-4 h-4 bg-green-500 inline-block mr-2"></div>
						<span>Answered</span>
					</div>
					<div className="flex items-center mb-2">
						<div className="w-4 h-4 bg-red-500 inline-block mr-2"></div>
						<span>Visited but not Answered</span>
					</div>
					<div className="flex items-center mb-2">
						<div className="w-4 h-4 bg-purple-500 inline-block mr-2"></div>
						<span>Marked</span>
					</div>
					<div className="flex items-center mb-2">
						<div className="w-4 h-4 bg-purple-500 inline-block mr-2 relative">
							<FaCheck className="absolute top-0 right-0 w-2 h-2 text-green-500" />
						</div>
						<span>Marked and Answered</span>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-5 gap-4 p-4">
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
							className={`w-10 h-10 text-xs relative ${bgColor} ${
								isActive ? "border-4 border-black" : "shadow-md"
							}`}
						>
							{isSelected && isFlagged && (
								<FaCheck className="absolute top-0 right-0 w-4 h-4 text-green-500" />
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
