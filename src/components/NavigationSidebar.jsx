import React from "react";
import { Button } from "@/components/ui/button";
import QuestionNavigation from "@/components/QuestionNavigation";

const NavigationSidebar = ({
	questions,
	currentSectionIndex,
	currentQuestionIndex,
	jumpToQuestion,
	selectedOptions,
	showNavigation,
	setShowNavigation,
}) => {
	const currentSection = questions[currentSectionIndex];

	return (
		<div
			className={`fixed md:relative inset-0 md:inset-auto z-50 md:z-auto w-64 p-4 bg-gray-100 shadow-md transition-transform transform ${
				showNavigation ? "translate-x-0" : "-translate-x-full"
			} md:translate-x-0`}
		>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">Questions</h2>
				<Button
					className="md:hidden"
					onClick={() => setShowNavigation(false)}
				>
					Close
				</Button>
			</div>
			<QuestionNavigation
				numberOfQuestions={currentSection.questions.length}
				currentQuestionIndex={currentQuestionIndex}
				jumpToQuestion={(questionIndex) =>
					jumpToQuestion(currentSectionIndex, questionIndex)
				}
				selectedOptions={selectedOptions[currentSectionIndex]}
			/>
		</div>
	);
};

export default NavigationSidebar;
