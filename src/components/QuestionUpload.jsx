// components/QuestionUpload.js
"use client";

import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function QuestionUpload({ db }) {
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState(["", "", "", ""]);
	const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
	const [explanation, setExplanation] = useState("");
	const [jsonInput, setJsonInput] = useState("");
	const [isJsonMode, setIsJsonMode] = useState(false);
	const [message, setMessage] = useState("");

	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!db) {
			setMessage("Firebase is not initialized yet. Please try again.");
			return;
		}
		try {
			if (isJsonMode) {
				const questions = JSON.parse(jsonInput);
				for (const q of questions) {
					await addDoc(collection(db, "questions"), q);
				}
				setMessage("Multiple questions uploaded successfully!");
			} else {
				await addDoc(collection(db, "questions"), {
					question,
					options,
					correctOptionIndex,
					explanation,
				});
				setMessage("Question uploaded successfully!");
			}
			// Clear form
			setQuestion("");
			setOptions(["", "", "", ""]);
			setCorrectOptionIndex(0);
			setExplanation("");
			setJsonInput("");
		} catch (error) {
			setMessage("Error uploading question(s): " + error.message);
		}
	};

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">Upload Question</h2>
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
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							placeholder="Question"
							required
						/>
						{options.map((option, index) => (
							<Input
								key={index}
								type="text"
								value={option}
								onChange={(e) =>
									handleOptionChange(index, e.target.value)
								}
								placeholder={`Option ${index + 1}`}
								required
							/>
						))}
						<RadioGroup
							value={correctOptionIndex.toString()}
							onValueChange={(value) =>
								setCorrectOptionIndex(parseInt(value))
							}
						>
							<div className="flex items-center space-x-2">
								{options.map((_, index) => (
									<div
										key={index}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem
											value={index.toString()}
											id={`option${index}`}
										/>
										<Label htmlFor={`option${index}`}>
											Option {index + 1}
										</Label>
									</div>
								))}
							</div>
						</RadioGroup>
						<Textarea
							value={explanation}
							onChange={(e) => setExplanation(e.target.value)}
							placeholder="Explanation"
							required
						/>
					</>
				)}
				<Button type="submit">Upload Question</Button>
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
