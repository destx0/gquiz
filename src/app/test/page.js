"use client";
import { useEffect } from "react";
import Head from "next/head";
import TestHeader from "@/components/TestHeader";
import MainContent from "@/components/MainContent";
import QuestionControls from "@/components/QuestionControls";
import questions from "@/data/questions";
import useTestStore from "@/store/useTestStore";

export default function Test() {
	const {
		initializeQuestions,
		setCurrentSectionIndex,
		setCurrentQuestionIndex,
		handleOptionSelect,
		unmarkQuestion,
		markForReview,
		jumpToQuestion,
		setShowNavigation,
		markQuestionAsVisited,
		showNavigation,
		currentSectionIndex,
		currentQuestionIndex,
		selectedOptions,
		visitedQuestions,
		flaggedQuestions,
	} = useTestStore();

	useEffect(() => {
		initializeQuestions(questions);

		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setShowNavigation(true);
			} else {
				setShowNavigation(false);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Set the initial state based on the current window size
		return () => window.removeEventListener("resize", handleResize);
	}, [initializeQuestions, setShowNavigation]);

	useEffect(() => {
		markQuestionAsVisited();
	}, [currentQuestionIndex, currentSectionIndex, markQuestionAsVisited]);

	return (
		<>
			<Head>
				<title>Test Page</title>
				<meta name="description" content="This is a test page." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex flex-col min-h-screen">
				<TestHeader
					switchSection={setCurrentSectionIndex}
					setShowNavigation={setShowNavigation}
					showNavigation={showNavigation}
				/>
				<MainContent
					currentSectionIndex={currentSectionIndex}
					currentQuestionIndex={currentQuestionIndex}
					selectedOptions={selectedOptions}
					handleOptionSelect={handleOptionSelect}
					jumpToQuestion={jumpToQuestion}
					visitedQuestions={visitedQuestions}
					flaggedQuestions={flaggedQuestions}
					showNavigation={showNavigation}
					setShowNavigation={setShowNavigation}
				/>
				<QuestionControls
					currentQuestionIndex={currentQuestionIndex}
					currentSectionIndex={currentSectionIndex}
					questions={questions}
					setCurrentQuestionIndex={setCurrentQuestionIndex}
					unmarkQuestion={unmarkQuestion}
					markForReview={markForReview}
				/>
			</div>
		</>
	);
}
