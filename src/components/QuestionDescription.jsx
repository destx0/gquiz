import React from "react";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";

const QuestionDescription = ({
	answeredCount,
	markedCount,
	notVisitedCount,
	notAnsweredCount,
	markedAndAnsweredCount,
}) => {
	return (
		<div className="p-2">
			<div className="mb-2 grid grid-cols-2 gap-2 text-xs">
				<div className="flex items-center mb-1">
					<Button
						className="w-8 h-8 text-xs bg-green-500 text-white cursor-default relative"
						onClick={() => {}}
					>
						{answeredCount}
					</Button>
					<span className="ml-1 text-gray-700">Answered</span>
				</div>
				<div className="flex items-center mb-1">
					<Button
						className="w-8 h-8 text-xs bg-purple-500 text-white cursor-default relative"
						onClick={() => {}}
					>
						{markedCount}
					</Button>
					<span className="ml-1 text-gray-700">Marked</span>
				</div>
				<div className="flex items-center mb-1">
					<Button
						className="w-8 h-8 text-xs bg-secondary bg-opacity-50 text-white cursor-default relative"
						onClick={() => {}}
					>
						{notVisitedCount}
					</Button>
					<span className="ml-1 text-gray-700">Not Visited</span>
				</div>
				<div className="flex items-center mb-1">
					<Button
						className="w-8 h-8 text-xs bg-red-500 text-white cursor-default relative"
						onClick={() => {}}
					>
						{notAnsweredCount}
					</Button>
					<span className="ml-1 text-gray-700">Not Answered</span>
				</div>
				<div className="flex items-center mb-1 relative">
					<Button
						className="w-8 h-8 text-xs bg-purple-500 text-white cursor-default relative"
						onClick={() => {}}
					>
						{markedAndAnsweredCount}
						<FaCheck className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
					</Button>
					<span className="ml-1 text-gray-700">
						Marked and Answered
					</span>
				</div>
			</div>
		</div>
	);
};

export default QuestionDescription;
