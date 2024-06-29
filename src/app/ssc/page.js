import React from "react";
import SSCHeader from "@/components/SSCHeader";
import TestCardList from "@/components/TestCardList";

const quizzes = [
	{
		quizName: "Daily Quizzes",
		description:
			"Enhance your general knowledge and stay updated with daily quizzes tailored for SSC exams.",
		tests: [
			{
				testName: "Affairs for ALL SSC EXAMS: Daily Quiz",
				type: "Daily Quiz",
				questions: 15,
				marks: 15,
				time: "3 mins",
				languages: ["English", "Hindi"],
				status: "not started",
			},
			{
				testName: "General Knowledge Quiz",
				type: "Daily Quiz",
				questions: 20,
				marks: 20,
				time: "5 mins",
				languages: ["English"],
				status: "completed",
			},
			{
				testName: "Current Affairs Quiz",
				type: "Daily Quiz",
				questions: 10,
				marks: 10,
				time: "2 mins",
				languages: ["Hindi"],
				status: "not started",
			},
			{
				testName: "Daily Science Quiz",
				type: "Daily Quiz",
				questions: 25,
				marks: 25,
				time: "10 mins",
				languages: ["English"],
				status: "completed",
			},
		],
	},
	{
		quizName: "Mock Tests",
		description:
			"Prepare thoroughly with full-length mock tests designed to simulate real exam conditions.",
		tests: [
			{
				testName: "Full-Length Mock Test 1",
				type: "Mock Test",
				questions: 100,
				marks: 100,
				time: "120 mins",
				languages: ["Hindi", "English"],
				status: "completed",
			},
			{
				testName: "Full-Length Mock Test 2",
				type: "Mock Test",
				questions: 100,
				marks: 100,
				time: "120 mins",
				languages: ["Hindi"],
				status: "not started",
			},
			{
				testName: "Full-Length Mock Test 3",
				type: "Mock Test",
				questions: 100,
				marks: 100,
				time: "120 mins",
				languages: ["English"],
				status: "not started",
			},
			{
				testName: "Full-Length Mock Test 4",
				type: "Mock Test",
				questions: 100,
				marks: 100,
				time: "120 mins",
				languages: ["English"],
				status: "completed",
			},
		],
	},
];

const SSCPage = () => {
	return (
		<div>
			<SSCHeader />
			{quizzes.map((quiz, index) => (
				<div key={index} className="flex justify-center my-8 px-4">
					<div className="w-full max-w-4xl">
						<TestCardList
							tests={quiz.tests}
							sectionTitle={quiz.quizName}
							description={quiz.description}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default SSCPage;
