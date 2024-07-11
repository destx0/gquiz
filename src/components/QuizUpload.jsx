// components/QuizUpload.js
"use client";

import React, { useState } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlusCircle, MinusCircle } from "lucide-react";

export default function QuizUpload({ db }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [thumbnailLink, setThumbnailLink] = useState("");
	const [time, setTime] = useState("");
	const [questions, setQuestions] = useState([{}]);
	const [positiveMarks, setPositiveMarks] = useState("");
	const [negativeMarks, setNegativeMarks] = useState("");
	const [jsonInput, setJsonInput] = useState("");
	const [isJsonMode, setIsJsonMode] = useState(false);
	const [message, setMessage] = useState("");

	const addQuestion = () => {
		setQuestions([...questions, {}]);
	};

	const removeQuestion = (index) => {
		const newQuestions = [...questions];
		newQuestions.splice(index, 1);
		setQuestions(newQuestions);
	};

	const handleQuestionChange = (index, field, value) => {
		const newQuestions = [...questions];
		newQuestions[index] = { ...newQuestions[index], [field]: value };
		setQuestions(newQuestions);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!db) {
			setMessage("Firebase is not initialized yet. Please try again.");
			return;
		}
		try {
			const quizData = isJsonMode
				? JSON.parse(jsonInput)
				: {
						title,
						description,
						thumbnailLink,
						time: time ? parseInt(time) : null,
						positiveMarks: positiveMarks
							? parseFloat(positiveMarks)
							: null,
						negativeMarks: negativeMarks
							? parseFloat(negativeMarks)
							: null,
						questions,
				  };
			await processQuizData(quizData);
			setMessage("Quiz uploaded successfully!");
			// Clear form
			setTitle("");
			setDescription("");
			setThumbnailLink("");
			setTime("");
			setQuestions([{}]);
			setPositiveMarks("");
			setNegativeMarks("");
			setJsonInput("");
		} catch (error) {
			setMessage("Error uploading quiz: " + error.message);
		}
	};

	const processQuizData = async (quizData) => {
		const processedQuestions = [];
		for (const question of quizData.questions) {
			if (question.id) {
				// If it's an existing question, verify it exists
				const questionDoc = await getDoc(
					doc(db, "questions", question.id)
				);
				if (!questionDoc.exists()) {
					throw new Error(
						`Question with ID ${question.id} does not exist`
					);
				}
				processedQuestions.push(question.id);
			} else {
				// If it's a new question, add it to the questions collection
				const newQuestion = {
					question: question.question,
					options: question.options,
					correctOptionIndex: question.correctOptionIndex,
					explanation: question.explanation,
				};
				const docRef = await addDoc(
					collection(db, "questions"),
					newQuestion
				);
				processedQuestions.push(docRef.id);
			}
		}

		// Replace the questions array with just the IDs
		quizData.questionIds = processedQuestions;
		delete quizData.questions;

		// Add the quiz to the quizzes collection
		await addDoc(collection(db, "quizzes"), quizData);
	};

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">Upload Quiz</h2>
			<Button onClick={() => setIsJsonMode(!isJsonMode)}>
				{isJsonMode ? "Switch to Form Mode" : "Switch to JSON Mode"}
			</Button>
			<form onSubmit={handleSubmit} className="space-y-4">
				{isJsonMode ? (
					<Textarea
						value={jsonInput}
						onChange={(e) => setJsonInput(e.target.value)}
						placeholder="Paste your JSON here"
						className="h-64"
					/>
				) : (
					<>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Quiz Title"
						/>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Quiz Description"
						/>
						<Input
							type="text"
							value={thumbnailLink}
							onChange={(e) => setThumbnailLink(e.target.value)}
							placeholder="Thumbnail Link"
						/>
						<Input
							type="number"
							value={time}
							onChange={(e) => setTime(e.target.value)}
							placeholder="Time (in minutes)"
						/>
						{questions.map((question, index) => (
							<div
								key={index}
								className="space-y-2 border p-4 rounded"
							>
								<Input
									type="text"
									value={question.id || ""}
									onChange={(e) =>
										handleQuestionChange(
											index,
											"id",
											e.target.value
										)
									}
									placeholder="Question ID (leave empty for new question)"
								/>
								<Input
									type="text"
									value={question.question || ""}
									onChange={(e) =>
										handleQuestionChange(
											index,
											"question",
											e.target.value
										)
									}
									placeholder="Question Text"
								/>
								{[0, 1, 2, 3].map((optionIndex) => (
									<Input
										key={optionIndex}
										type="text"
										value={
											question.options?.[optionIndex] ||
											""
										}
										onChange={(e) => {
											const newOptions = [
												...(question.options || []),
											];
											newOptions[optionIndex] =
												e.target.value;
											handleQuestionChange(
												index,
												"options",
												newOptions
											);
										}}
										placeholder={`Option ${
											optionIndex + 1
										}`}
									/>
								))}
								<Input
									type="number"
									value={question.correctOptionIndex || ""}
									onChange={(e) =>
										handleQuestionChange(
											index,
											"correctOptionIndex",
											parseInt(e.target.value)
										)
									}
									placeholder="Correct Option Index"
								/>
								<Textarea
									value={question.explanation || ""}
									onChange={(e) =>
										handleQuestionChange(
											index,
											"explanation",
											e.target.value
										)
									}
									placeholder="Explanation"
								/>
								<Button
									type="button"
									onClick={() => removeQuestion(index)}
									className="w-full"
								>
									<MinusCircle className="h-4 w-4 mr-2" />{" "}
									Remove Question
								</Button>
							</div>
						))}
						<Button
							type="button"
							onClick={addQuestion}
							className="w-full"
						>
							<PlusCircle className="h-4 w-4 mr-2" /> Add Question
						</Button>
						<Input
							type="number"
							value={positiveMarks}
							onChange={(e) => setPositiveMarks(e.target.value)}
							placeholder="Positive Marks"
						/>
						<Input
							type="number"
							value={negativeMarks}
							onChange={(e) => setNegativeMarks(e.target.value)}
							placeholder="Negative Marks"
						/>
					</>
				)}
				<Button type="submit">Upload Quiz</Button>
			</form>
			{message && (
				<Alert>
					<AlertTitle>Notification</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			)}
		</div>
	);
}
