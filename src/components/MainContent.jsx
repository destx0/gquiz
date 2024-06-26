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
		<div className="flex w-full">
			<div className="flex-grow">
				<MainQuestion
					currentSectionIndex={currentSectionIndex}
					currentQuestionIndex={currentQuestionIndex}
					questions={questions}
					selectedOptions={selectedOptions}
					handleOptionSelect={handleOptionSelect}
				/>
			</div>
			<div className="flex-shrink-0">
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
		</div>
	);
};

export default MainContent;
