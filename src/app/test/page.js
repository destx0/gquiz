"use client";
import { useState } from "react";
import Head from "next/head";
import Question from "@/components/Question";
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

	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const prevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const handleOptionSelect = (option) => {
		const newSelectedOptions = [...selectedOptions];
		newSelectedOptions[currentQuestionIndex] = option;
		setSelectedOptions(newSelectedOptions);
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
				<Question
					question={questions[currentQuestionIndex].question}
					options={questions[currentQuestionIndex].options}
					selectedOption={selectedOptions[currentQuestionIndex]}
					onSelectOption={handleOptionSelect}
				/>
				<div className="mt-4 flex space-x-4">
					<Button
						onClick={prevQuestion}
						disabled={currentQuestionIndex === 0}
					>
						Previous
					</Button>
					<Button
						onClick={nextQuestion}
						disabled={currentQuestionIndex === questions.length - 1}
					>
						Next
					</Button>
				</div>
			</div>
		</>
	);
}
