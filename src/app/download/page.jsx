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

export default function FetchPage() {
	const [data, setData] = useState([]);
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

	const fetchAllQuizzes = async () => {
		if (!db) {
			setError("Firebase is not initialized yet. Please try again.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const quizzesCollection = collection(db, "quizzes");
			const quizzesSnapshot = await getDocs(quizzesCollection);
			const quizzesList = quizzesSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setData(quizzesList);
		} catch (err) {
			setError("Error fetching quizzes: " + err.message);
		} finally {
			setLoading(false);
		}
	};

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
			setData(questionsList);
		} catch (err) {
			setError("Error fetching questions: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchQuizById = async () => {
		if (!db) {
			setError("Firebase is not initialized yet. Please try again.");
			return;
		}
		if (!searchId) {
			setError("Please enter a quiz ID");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const quizDoc = await getDoc(doc(db, "quizzes", searchId));
			if (quizDoc.exists()) {
				setData([{ id: quizDoc.id, ...quizDoc.data() }]);
			} else {
				setError("No quiz found with the given ID");
				setData([]);
			}
		} catch (err) {
			setError("Error fetching quiz: " + err.message);
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
				setData([{ id: questionDoc.id, ...questionDoc.data() }]);
			} else {
				setError("No question found with the given ID");
				setData([]);
			}
		} catch (err) {
			setError("Error fetching question: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Fetch Data</h1>

			<div className="flex space-x-2 mb-4">
				<Button onClick={fetchAllQuizzes} disabled={loading}>
					Fetch All Quizzes
				</Button>
				<Button onClick={fetchAllQuestions} disabled={loading}>
					Fetch All Questions
				</Button>
				<Input
					type="text"
					value={searchId}
					onChange={(e) => setSearchId(e.target.value)}
					placeholder="Enter ID"
				/>
				<Button onClick={fetchQuizById} disabled={loading}>
					Fetch Quiz by ID
				</Button>
				<Button onClick={fetchQuestionById} disabled={loading}>
					Fetch Question by ID
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
				{data.map((item) => (
					<Card key={item.id}>
						<CardHeader>
							<CardTitle>{item.title || item.question}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								<strong>ID:</strong> {item.id}
							</p>
							{item.description && (
								<p>
									<strong>Description:</strong>{" "}
									{item.description}
								</p>
							)}
							{item.thumbnailLink && (
								<p>
									<strong>Thumbnail:</strong>{" "}
									{item.thumbnailLink}
								</p>
							)}
							{item.time && (
								<p>
									<strong>Time:</strong> {item.time} minutes
								</p>
							)}
							{item.positiveMarks && (
								<p>
									<strong>Positive Marks:</strong>{" "}
									{item.positiveMarks}
								</p>
							)}
							{item.negativeMarks && (
								<p>
									<strong>Negative Marks:</strong>{" "}
									{item.negativeMarks}
								</p>
							)}
							{item.questionIds && (
								<p>
									<strong>Question IDs:</strong>{" "}
									{item.questionIds.join(", ")}
								</p>
							)}
							{item.options && (
								<>
									<p>
										<strong>Options:</strong>
									</p>
									<ul className="list-disc pl-5">
										{item.options.map((option, index) => (
											<li
												key={index}
												className={
													index ===
													item.correctOptionIndex
														? "font-bold"
														: ""
												}
											>
												{option}{" "}
												{index ===
													item.correctOptionIndex &&
													"(Correct)"}
											</li>
										))}
									</ul>
								</>
							)}
							{item.explanation && (
								<p>
									<strong>Explanation:</strong>{" "}
									{item.explanation}
								</p>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
