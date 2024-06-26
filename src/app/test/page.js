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
];

export default function Test() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOptions, setSelectedOptions] = useState(
		Array(questions.length).fill(null)
	);

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
			<div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
				<h1 className="text-4xl font-bold mb-4">Test Page</h1>
				<div className="flex w-full max-w-4xl">
					<div className="flex-1 p-4">
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
									currentQuestionIndex ===
									questions.length - 1
								}
							>
								Next
							</Button>
						</div>
					</div>
					<div className="w-64 p-4 bg-white shadow-md rounded-lg">
						<QuestionNavigation
							numberOfQuestions={questions.length}
							currentQuestionIndex={currentQuestionIndex}
							jumpToQuestion={jumpToQuestion}
							selectedOptions={selectedOptions}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
