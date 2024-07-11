"use client";

import React, { useState, useEffect } from "react";
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	getDoc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

let db;

export default function FetchQuestionsPage() {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchId, setSearchId] = useState("");

	useEffect(() => {
		const initFirebase = async () => {
			const firebaseApp = (await import("@/lib/firebase/config")).default;
			db = getFirestore(firebaseApp);
		};
		initFirebase();
	}, []);

	const fetchAllQuestions = async () => {
		if (!db) {
			setError("Firebase is not initialized yet. Please try again.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const questionsCollection = collection(db, "questions");
			const questionsSnapshot = await getDocs(questionsCollection);
			const questionsList = questionsSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setQuestions(questionsList);
		} catch (err) {
			setError("Error fetching questions: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchQuestionById = async () => {
		if (!db) {
			setError("Firebase is not initialized yet. Please try again.");
			return;
		}
		if (!searchId) {
			setError("Please enter a question ID");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const questionDoc = await getDoc(doc(db, "questions", searchId));
			if (questionDoc.exists()) {
				setQuestions([{ id: questionDoc.id, ...questionDoc.data() }]);
			} else {
				setError("No question found with the given ID");
				setQuestions([]);
			}
		} catch (err) {
			setError("Error fetching question: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Fetch Questions</h1>

			<div className="flex space-x-2 mb-4">
				<Button onClick={fetchAllQuestions} disabled={loading}>
					Fetch All Questions
				</Button>
				<Input
					type="text"
					value={searchId}
					onChange={(e) => setSearchId(e.target.value)}
					placeholder="Enter Question ID"
				/>
				<Button onClick={fetchQuestionById} disabled={loading}>
					Fetch by ID
				</Button>
			</div>

			{loading && <p>Loading...</p>}

			{error && (
				<Alert className="mb-4">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<div className="space-y-4">
				{questions.map((question) => (
					<Card key={question.id}>
						<CardHeader>
							<CardTitle>{question.question}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<strong>ID:</strong> {question.id}
							</p>
							<p>
								<strong>Options:</strong>
							</p>
							<ul className="list-disc pl-5">
								{question.options.map((option, index) => (
									<li
										key={index}
										className={
											index ===
											question.correctOptionIndex
												? "font-bold"
												: ""
										}
									>
										{option}{" "}
										{index ===
											question.correctOptionIndex &&
											"(Correct)"}
									</li>
								))}
							</ul>
							<p>
								<strong>Explanation:</strong>{" "}
								{question.explanation}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
