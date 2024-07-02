"use client";
import { useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import TestHeader from "@/components/TestHeader";
import MainContent from "@/components/MainContent";
import QuestionControls from "@/components/QuestionControls";
import questions from "@/data/questions";
import useTestStore from "@/store/testStore";

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
			setShowNavigation(window.innerWidth >= 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Set the initial state based on the current window size
		return () => window.removeEventListener("resize", handleResize);
	}, [initializeQuestions, setShowNavigation]);

	useEffect(() => {
		markQuestionAsVisited();
	}, [currentQuestionIndex, currentSectionIndex, markQuestionAsVisited]);

	const memoizedMainContent = useMemo(
		() => (
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
		),
		[
			currentSectionIndex,
			currentQuestionIndex,
			selectedOptions,
			handleOptionSelect,
			jumpToQuestion,
			visitedQuestions,
			flaggedQuestions,
			showNavigation,
			setShowNavigation,
		]
	);

	const memoizedQuestionControls = useMemo(
		() => (
			<QuestionControls
				currentQuestionIndex={currentQuestionIndex}
				currentSectionIndex={currentSectionIndex}
				questions={questions}
				setCurrentQuestionIndex={setCurrentQuestionIndex}
				unmarkQuestion={unmarkQuestion}
				markForReview={markForReview}
			/>
		),
		[
			currentQuestionIndex,
			currentSectionIndex,
			setCurrentQuestionIndex,
			unmarkQuestion,
			markForReview,
		]
	);

	const handleSetShowNavigation = useCallback(
		(show) => {
			setShowNavigation(show);
		},
		[setShowNavigation]
	);

	return (
		<>
			<Head>
				<title>Test Page</title>
				<meta name="description" content="This is a test page." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex flex-col min-h-screen">
				<TestHeader setShowNavigation={handleSetShowNavigation} />
				{memoizedMainContent}
				{memoizedQuestionControls}
			</div>
		</>
	);
}
