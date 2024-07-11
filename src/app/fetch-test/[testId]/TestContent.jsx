"use client";

import { useState, useEffect } from "react";
import {
	getFirestore,
	doc,
	getDoc,
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function TestContent({ testId }) {
	const [test, setTest] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTestAndQuestions = async () => {
			try {
				const firebaseApp = (await import("@/lib/firebase/config"))
					.default;
				const db = getFirestore(firebaseApp);

				// Fetch test details
				const testDoc = await getDoc(doc(db, "quizzes", testId));

				if (!testDoc.exists()) {
					setError("Test not found");
					return;
				}

				const testData = { id: testDoc.id, ...testDoc.data() };
				setTest(testData);

				// Fetch questions
				if (testData.questionIds && testData.questionIds.length > 0) {
					const questionsQuery = query(
						collection(db, "questions"),
						where("__name__", "in", testData.questionIds)
					);
					const questionsSnapshot = await getDocs(questionsQuery);
					const questionsData = questionsSnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					setQuestions(questionsData);
				}
			} catch (err) {
				setError("Error fetching test and questions: " + err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTestAndQuestions();
	}, [testId]);

	if (loading) return <div>Loading test content...</div>;
	if (error)
		return (
			<Alert>
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	if (!test) return <div>Test not found</div>;

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>{test.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						<strong>Time:</strong> {test.time} minutes
					</p>
					<p>
						<strong>Number of questions:</strong>{" "}
						{test.questionIds?.length || 0}
					</p>
					{test.description && (
						<p>
							<strong>Description:</strong> {test.description}
						</p>
					)}
					{test.positiveMarks && (
						<p>
							<strong>Positive Marks:</strong>{" "}
							{test.positiveMarks}
						</p>
					)}
					{test.negativeMarks && (
						<p>
							<strong>Negative Marks:</strong>{" "}
							{test.negativeMarks}
						</p>
					)}
				</CardContent>
			</Card>

			<h2 className="text-xl font-bold mt-6 mb-2">Questions</h2>
			<Accordion type="single" collapsible className="w-full">
				{questions.map((question, index) => (
					<AccordionItem
						key={question.id}
						value={`question-${index}`}
					>
						<AccordionTrigger>
							Question {index + 1}
						</AccordionTrigger>
						<AccordionContent>
							<Card>
								<CardContent className="pt-4">
									<p className="font-semibold mb-2">
										{question.question}
									</p>
									<ul className="list-disc pl-5">
										{question.options.map(
											(option, optionIndex) => (
												<li
													key={optionIndex}
													className={
														optionIndex ===
														question.correctOptionIndex
															? "font-bold"
															: ""
													}
												>
													{option}{" "}
													{optionIndex ===
														question.correctOptionIndex &&
														"(Correct)"}
												</li>
											)
										)}
									</ul>
									{question.explanation && (
										<p className="mt-2">
											<strong>Explanation:</strong>{" "}
											{question.explanation}
										</p>
									)}
								</CardContent>
							</Card>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
