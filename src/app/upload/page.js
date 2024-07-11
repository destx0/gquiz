// app/upload/page.js
"use client";

import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import QuestionUpload from "@/components/QuestionUpload";
import QuizUpload from "@/components/QuizUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

let db;

export default function UploadPage() {
	const [activeTab, setActiveTab] = useState("question");

	useEffect(() => {
		const initFirebase = async () => {
			const firebaseApp = (await import("@/lib/firebase/config")).default;
			db = getFirestore(firebaseApp);
		};
		initFirebase();
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">
				Upload Questions and Quizzes
			</h1>
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList>
					<TabsTrigger value="question">Upload Question</TabsTrigger>
					<TabsTrigger value="quiz">Upload Quiz</TabsTrigger>
				</TabsList>
				<TabsContent value="question">
					<QuestionUpload db={db} />
				</TabsContent>
				<TabsContent value="quiz">
					<QuizUpload db={db} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
