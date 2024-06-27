import React from "react";
import { Button } from "@/components/ui/button";
import QuestionNavigation from "@/components/QuestionNavigation";
import QuestionDescription from "@/components/QuestionDescription";
import { Separator } from "@/components/ui/separator";
import questions from "@/data/questions"; // Import questions data to get section names

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
		<div className={`fixed right-0 h-full w-64  shadow-lg`}>
			<div className="flex justify-between items-center p-4 bg-muted shadow-2xl">
				<h2 className="text-lg font-semibold text-primary">
					Section: {questions[currentSectionIndex].section}
				</h2>
			</div>
			<div>
				<Separator />
				<div className="bg-gray-50">
					<QuestionDescription />
				</div>
				<Separator />
				<div className="">
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
		</div>
	);
};

export default NavigationSidebar;
