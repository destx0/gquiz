// src/store/firebaseSlice.ts

import { db } from "../../lib/firebase/config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const firebaseSlice = (set, get) => ({
	loadQuiz: async (quizId) => {
		try {
			const quizRef = collection(db, "quizzes");
			const q = query(quizRef, where("id", "==", quizId));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				const quizData = querySnapshot.docs[0].data();
				get().initializeQuizMetadata(quizData);
				get().initializeQuestions(quizData.questions);
				get().initializeTimers(
					quizData.questions,
					quizData.totalTimeInMinutes,
					quizData.positiveMarks,
					quizData.negativeMarks
				);
			} else {
				console.error("Quiz not found");
			}
		} catch (error) {
			console.error("Error loading quiz:", error);
		}
	},

	uploadQuiz: async (quizData) => {
		try {
			const quizRef = collection(db, "quizzes");
			await addDoc(quizRef, quizData);
			console.log("Quiz uploaded successfully");
		} catch (error) {
			console.error("Error uploading quiz:", error);
		}
	},
});
