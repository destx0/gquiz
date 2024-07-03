"use client";
import { useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import TestHeader from "@/components/TestHeader";
import SecondaryHeader from "@/components/SecondaryHeader";
import MainContent from "@/components/MainContent";
import QuestionControls from "@/components/QuestionControls";
import quizData from "@/data/quizData";
import useTestStore from "@/store/testStore";

export default function Test() {
	const {
		initializeQuestions,
		initializeTimers,
		initializeQuizMetadata,
		setQuizStartTime,
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
		// Initialize questions
		initializeQuestions(quizData.questions);

		// Initialize timers
		initializeTimers(quizData.questions, quizData.totalTimeInMinutes);

		// Initialize quiz metadata
		initializeQuizMetadata({
			name: quizData.name,
			description: quizData.description,
			language: quizData.language,
			totalTimeInMinutes: quizData.totalTimeInMinutes,
			positiveMarks: quizData.positiveMarks,
			negativeMarks: quizData.negativeMarks,
		});

		// Set quiz start time
		setQuizStartTime(Date.now());

		const handleResize = () => {
			setShowNavigation(window.innerWidth >= 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [
		initializeQuestions,
		initializeTimers,
		initializeQuizMetadata,
		setQuizStartTime,
		setShowNavigation,
	]);

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
				quizData={quizData}
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
				questions={quizData.questions}
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
				/>
				<SecondaryHeader
					currentSectionIndex={currentSectionIndex}
					currentQuestionIndex={currentQuestionIndex}
				/>
				{memoizedMainContent}
				{memoizedQuestionControls}
			</div>
		</>
	);
}
