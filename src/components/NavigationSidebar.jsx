import React from "react";
import { Button } from "@/components/ui/button";
import QuestionNavigation from "@/components/QuestionNavigation";
import QuestionDescription from "@/components/QuestionDescription";
import { Separator } from "@/components/ui/separator";
import quizData from "@/data/quizData"; // Updated import

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

	const currentSection = quizData.questions[currentSectionIndex];
	const sectionQuestions = currentSection.questions;

	// Calculate the counts for the current section
	const answeredCount = selectedOptions.filter(
		(option) => option !== null
	).length;
	const markedCount = flaggedQuestions.filter((flag) => flag).length;
	const notVisitedCount = visitedQuestions.filter(
		(visited) => !visited
	).length;
	const notAnsweredCount = visitedQuestions.filter(
		(visited, index) => visited && selectedOptions[index] === null
	).length;
	const markedAndAnsweredCount = flaggedQuestions.filter(
		(flag, index) => flag && selectedOptions[index] !== null
	).length;

	return (
		<div className={`fixed right-0 h-full w-64 bg-gray-100 shadow-lg`}>
			<div className="flex justify-between items-center p-4 bg-muted shadow-2xl">
				<h2 className="text-lg font-semibold text-primary">
					Section: {currentSection.section}
				</h2>
			</div>
			<div>
				<Separator />
				<div className="bg-gray-50">
					<QuestionDescription
						answeredCount={answeredCount}
						markedCount={markedCount}
						notVisitedCount={notVisitedCount}
						notAnsweredCount={notAnsweredCount}
						markedAndAnsweredCount={markedAndAnsweredCount}
					/>
				</div>
				<Separator />
				<div className="">
					<QuestionNavigation
						numberOfQuestions={sectionQuestions.length}
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
