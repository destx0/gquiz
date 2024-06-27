import React from "react";
import { Button } from "@/components/ui/button";
import QuestionNavigation from "@/components/QuestionNavigation";
import QuestionDescription from "@/components/QuestionDescription";
import { Separator } from "@/components/ui/separator";

const NavigationSidebar = ({
	currentSectionIndex,
	currentQuestionIndex,
	jumpToQuestion,
	selectedOptions,
	visitedQuestions,
	flaggedQuestions,
	showNavigation,
	setShowNavigation,
	numberOfQuestions,
}) => {
	if (!showNavigation) return null;

	return (
		<div
			className={`fixed right-0 top-0 h-full  w-64 bg-gray-100 shadow-lg transition-transform transform md:relative md:translate-x-0 md:block md:h-screen`}
		>
			<div className="flex justify-between items-center  p-4">
				<h2 className="text-lg font-semibold">Questions</h2>
				<Button
					className="md:hidden"
					onClick={() => setShowNavigation(false)}
				>
					Close
				</Button>
			</div>
			<div className="p-2">
				<Separator />

				<QuestionDescription />
				<Separator />

				<QuestionNavigation
					numberOfQuestions={numberOfQuestions}
					currentQuestionIndex={currentQuestionIndex}
					jumpToQuestion={(questionIndex) =>
						jumpToQuestion(currentSectionIndex, questionIndex)
					}
					selectedOptions={selectedOptions}
					visitedQuestions={visitedQuestions}
					flaggedQuestions={flaggedQuestions}
				/>
			</div>
		</div>
	);
};

export default NavigationSidebar;
