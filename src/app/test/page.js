"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import MainQuestion from "@/components/MainQuestion";
import NavigationSidebar from "@/components/NavigationSidebar";
import QuestionControls from "@/components/QuestionControls";
import { Button } from "@/components/ui/button";
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
	const [showNavigation, setShowNavigation] = useState(false);

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
				<header className="bg-gray-200 p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
					<div className="flex space-x-4 mb-4 md:mb-0">
						{questions.map((section, index) => (
							<Button
								key={index}
								onClick={() => switchSection(index)}
								className={`${
									currentSectionIndex === index
										? "bg-blue-500 text-white"
										: "bg-gray-300"
								} px-4 py-2 rounded-lg`}
							>
								{section.section}
							</Button>
						))}
					</div>
					<h1 className="text-2xl font-bold">
						{questions[currentSectionIndex].section}
					</h1>
				</header>
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
						showNavigation={showNavigation}
						setShowNavigation={setShowNavigation}
						numberOfQuestions={
							questions[currentSectionIndex].questions.length
						}
					/>
				</div>
				<QuestionControls
					currentQuestionIndex={currentQuestionIndex}
					currentSectionIndex={currentSectionIndex}
					questions={questions}
					setCurrentQuestionIndex={setCurrentQuestionIndex}
					unmarkQuestion={unmarkQuestion}
				/>
				<Button
					className="fixed bottom-4 right-4 md:hidden"
					onClick={() => setShowNavigation(true)}
				>
					Questions
				</Button>
			</div>
		</>
	);
}
