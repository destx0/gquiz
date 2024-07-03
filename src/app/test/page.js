"use client";
import { useEffect, useCallback, useMemo, useState } from "react";
import Head from "next/head";
import TestHeader from "@/components/TestHeader";
import MainContent from "@/components/MainContent";
import QuestionControls from "@/components/QuestionControls";
import GlobalTimer from "@/components/GlobalTimer";
import QuestionTimer from "@/components/QuestionTimer";
import quizData from "@/data/quizData";
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
		questionTimers,
		updateQuestionTimer,
	} = useTestStore();

	const [globalTimeRemaining, setGlobalTimeRemaining] = useState(
		quizData.totalTimeInMinutes * 60
	);

	useEffect(() => {
		initializeQuestions(quizData.questions);

		const handleResize = () => {
			setShowNavigation(window.innerWidth >= 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		// Start global timer
		const globalTimerInterval = setInterval(() => {
			setGlobalTimeRemaining((prevTime) => {
				if (prevTime <= 0) {
					clearInterval(globalTimerInterval);
					// Handle quiz submission when time is up
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => {
			window.removeEventListener("resize", handleResize);
			clearInterval(globalTimerInterval);
		};
	}, [initializeQuestions, setShowNavigation]);

	useEffect(() => {
		markQuestionAsVisited();
	}, [currentQuestionIndex, currentSectionIndex, markQuestionAsVisited]);

	const currentQuestion =
		quizData.questions[currentSectionIndex].questions[currentQuestionIndex];

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
				<div className="bg-gray-100 p-4 mb-4">
					<h2 className="text-xl font-bold">{quizData.name}</h2>
					<p>{quizData.description}</p>
					<p>Language: {quizData.language}</p>
					<p>
						Marks: +{quizData.positiveMarks} for correct, -
						{quizData.negativeMarks} for incorrect
					</p>
					<GlobalTimer timeRemaining={globalTimeRemaining} />
				</div>
				<div className="mb-4">
					<QuestionTimer
						key={`${currentSectionIndex}-${currentQuestionIndex}`}
						initialTime={currentQuestion.timeLimit || 60}
						onTimeUpdate={(time) =>
							updateQuestionTimer(
								currentSectionIndex,
								currentQuestionIndex,
								time
							)
						}
					/>
				</div>
				{memoizedMainContent}
				{memoizedQuestionControls}
			</div>
		</>
	);
}
