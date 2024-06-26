"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import TestHeader from "@/components/TestHeader";
import MainContent from "@/components/MainContent";
import QuestionControls from "@/components/QuestionControls";
import questions from "@/data/questions";

export default function Test() {
	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptions, setSelectedOptions] = useState(
		questions.map((section) => Array(section.questions.length).fill(null))
	);
	const [visitedQuestions, setVisitedQuestions] = useState(
		questions.map((section) => Array(section.questions.length).fill(false))
	);
	const [flaggedQuestions, setFlaggedQuestions] = useState(
		questions.map((section) => Array(section.questions.length).fill(false))
	);
	const [showNavigation, setShowNavigation] = useState(false);

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		const newVisitedQuestions = [...visitedQuestions];
		newVisitedQuestions[currentSectionIndex][currentQuestionIndex] = true;
		setVisitedQuestions(newVisitedQuestions);
	}, [currentQuestionIndex, currentSectionIndex]);

	const handleOptionSelect = (index) => {
		const newSelectedOptions = [...selectedOptions];
		newSelectedOptions[currentSectionIndex][currentQuestionIndex] = index;
		setSelectedOptions(newSelectedOptions);
	};

	const unmarkQuestion = (sectionIndex, questionIndex) => {
		const newSelectedOptions = [...selectedOptions];
		newSelectedOptions[sectionIndex][questionIndex] = null;
		setSelectedOptions(newSelectedOptions);
	};

	const markForReview = (sectionIndex, questionIndex) => {
		const newFlaggedQuestions = [...flaggedQuestions];
		newFlaggedQuestions[sectionIndex][questionIndex] =
			!newFlaggedQuestions[sectionIndex][questionIndex];
		setFlaggedQuestions(newFlaggedQuestions);
	};

	const jumpToQuestion = (sectionIndex, questionIndex) => {
		setCurrentSectionIndex(sectionIndex);
		setCurrentQuestionIndex(questionIndex);
	};

	const switchSection = (sectionIndex) => {
		setCurrentSectionIndex(sectionIndex);
		setCurrentQuestionIndex(0);
	};

	return (
		<>
			<Head>
				<title>Test Page</title>
				<meta name="description" content="This is a test page." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex flex-col min-h-screen">
				<TestHeader
					switchSection={switchSection}
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
