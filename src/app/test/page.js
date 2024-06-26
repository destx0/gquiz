"use client";
import { useState } from "react";
import Head from "next/head";
import Question from "@/components/Question";
import QuestionNavigation from "@/components/QuestionNavigation";
import { Button } from "@/components/ui/button";

const questions = [
	{
		question: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Madrid"],
	},
	{
		question: "What is the capital of Germany?",
		options: ["Paris", "London", "Berlin", "Madrid"],
	},
	{
		question: "What is the capital of Spain?",
		options: ["Paris", "London", "Berlin", "Madrid"],
	},
	{
		question: "What is the capital of Italy?",
		options: ["Rome", "London", "Berlin", "Madrid"],
	},
	{
		question: "What is the capital of France?",
		options: ["Paris", "London", "Berlin", "Madrid"],
	},
	{
		question: "What is the capital of Germany?",
		options: ["Paris", "London", "Berlin", "Madrid"],
	},
	{
		question: "What is the capital of Spain?",
		options: ["Paris", "London", "Berlin", "Madrid"],
	},
	{
		question: "What is the capital of Italy?",
		options: ["Rome", "London", "Berlin", "Madrid"],
	},
];

export default function Test() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptions, setSelectedOptions] = useState(
		Array(questions.length).fill(null)
	);
	const [showNavigation, setShowNavigation] = useState(false);

	const handleOptionSelect = (index) => {
		const newSelectedOptions = [...selectedOptions];
		newSelectedOptions[currentQuestionIndex] = index;
		setSelectedOptions(newSelectedOptions);
	};

	const jumpToQuestion = (index) => {
		setCurrentQuestionIndex(index);
	};

	return (
		<>
			<Head>
				<title>Test Page</title>
				<meta name="description" content="This is a test page." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex min-h-screen">
				<div className="flex-1 p-4">
					<h1 className="text-2xl font-bold mb-4">
						Question No. {currentQuestionIndex + 1}
					</h1>
					<Question
						question={questions[currentQuestionIndex].question}
						options={questions[currentQuestionIndex].options}
						selectedOptionIndex={
							selectedOptions[currentQuestionIndex]
						}
						onSelectOption={handleOptionSelect}
					/>
					<div className="mt-4 flex space-x-4">
						<Button
							onClick={() =>
								setCurrentQuestionIndex(
									currentQuestionIndex - 1
								)
							}
							disabled={currentQuestionIndex === 0}
						>
							Previous
						</Button>
						<Button
							onClick={() =>
								setCurrentQuestionIndex(
									currentQuestionIndex + 1
								)
							}
							disabled={
								currentQuestionIndex === questions.length - 1
							}
						>
							Next
						</Button>
					</div>
				</div>
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
						numberOfQuestions={questions.length}
						currentQuestionIndex={currentQuestionIndex}
						jumpToQuestion={jumpToQuestion}
						selectedOptions={selectedOptions}
					/>
				</div>
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
