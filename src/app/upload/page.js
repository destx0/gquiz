"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

let db;

export default function UploadPage() {
	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState(["", "", "", ""]);
	const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
	const [explanation, setExplanation] = useState("");
	const [jsonInput, setJsonInput] = useState("");
	const [isJsonMode, setIsJsonMode] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const initFirebase = async () => {
			const firebaseApp = (await import("@/lib/firebase/config")).default;
			db = getFirestore(firebaseApp);
		};
		initFirebase();
	}, []);

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
					await addDoc(collection(db, "questions"), {
						id: uuidv4(),
						...q,
					});
				}
				setMessage("Multiple questions uploaded successfully!");
			} else {
				await addDoc(collection(db, "questions"), {
					id: uuidv4(),
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
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Upload Questions</h1>
			<Button onClick={() => setIsJsonMode(!isJsonMode)} className="mb-4">
				{isJsonMode
					? "Switch to Single Question Mode"
					: "Switch to JSON Mode"}
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
				<Button type="submit">Upload</Button>
			</form>
			{message && (
				<Alert className="mt-4">
					<AlertTitle>Notification</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			)}
		</div>
	);
}
