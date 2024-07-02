"use client";
import { useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import TestHeader from "@/components/TestHeader";
import MainContent from "@/components/MainContent";
import QuestionControls from "@/components/QuestionControls";
import quizData from "@/data/quizData"; // Updated import
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
		initializeQuestions(quizData.questions); // Updated to use quizData.questions

		const handleResize = () => {
			setShowNavigation(window.innerWidth >= 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize();
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
				quizData={quizData} // Pass quizData to MainContent
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
				questions={quizData.questions} // Updated to use quizData.questions
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
				<title>{quizData.name}</title>
				<meta name="description" content={quizData.description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex flex-col min-h-screen">
				<TestHeader
					setShowNavigation={handleSetShowNavigation}
					quizName={quizData.name}
					totalTime={quizData.totalTimeInMinutes}
				/>
				<div className="bg-gray-100 p-4 mb-4">
					<h2 className="text-xl font-bold">{quizData.name}</h2>
					<p>{quizData.description}</p>
					<p>Language: {quizData.language}</p>
					<p>Total Time: {quizData.totalTimeInMinutes} minutes</p>
					<p>
						Marks: +{quizData.positiveMarks} for correct, -
						{quizData.negativeMarks} for incorrect
					</p>
				</div>
				{memoizedMainContent}
				{memoizedQuestionControls}
			</div>
		</>
	);
}
