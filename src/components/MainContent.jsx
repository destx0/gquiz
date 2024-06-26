import React from "react";
import MainQuestion from "@/components/MainQuestion";
import NavigationSidebar from "@/components/NavigationSidebar";
import useTestStore from "@/store/useTestStore";
import questions from "@/data/questions";

const MainContent = () => {
	const {
		currentSectionIndex,
		currentQuestionIndex,
		selectedOptions,
		handleOptionSelect,
		jumpToQuestion,
		visitedQuestions,
		flaggedQuestions,
		showNavigation,
		setShowNavigation,
	} = useTestStore();

	return (
		<div className="flex flex-1">
			<MainQuestion
				currentSectionIndex={currentSectionIndex}
				currentQuestionIndex={currentQuestionIndex}
				questions={questions}
				selectedOptions={selectedOptions}
				handleOptionSelect={handleOptionSelect}
			/>
			<NavigationSidebar
				currentSectionIndex={currentSectionIndex}
				currentQuestionIndex={currentQuestionIndex}
				jumpToQuestion={jumpToQuestion}
				selectedOptions={selectedOptions[currentSectionIndex]}
				visitedQuestions={visitedQuestions[currentSectionIndex]}
				flaggedQuestions={flaggedQuestions[currentSectionIndex]}
				showNavigation={showNavigation}
				setShowNavigation={setShowNavigation}
				numberOfQuestions={
					questions[currentSectionIndex].questions.length
				}
			/>
		</div>
	);
};

export default MainContent;
