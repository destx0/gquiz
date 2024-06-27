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
		<div className={`fixed right-0 h-full  w-64 bg-gray-100 shadow-lg `}>
			<div className="flex justify-between items-center p-4 bg-gray-200 shadow-2xl">
				<h2 className="text-lg font-semibold ">
					Section: {questions[currentSectionIndex].section}
				</h2>
			</div>
			<div className="">
				<Separator />
				<div className="bg-gray-50 ">
					<QuestionDescription />
				</div>
				<Separator />
				<div className="shadow-lg">
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
