import React from "react";
import SSCHeader from "@/components/SSCHeader";
import TestCardList from "@/components/TestCardList";

const dailyQuizzes = [
	{
		testName: "Affairs for ALL SSC EXAMS: Daily Quiz",
		type: "Daily Quiz",
		questions: 15,
		time: "3 mins",
		languages: ["English", "Hindi"],
		status: "not started", // or "completed"
	},
];

const mockTests = [
	{
		testName: "Another Test",
		type: "Mock Test",
		questions: 30,
		time: "90 mins",
		languages: ["Hindi", "English"],
		status: "completed", // or "not started"
	},
];

const SSCPage = () => {
	return (
		<div>
			<SSCHeader />
			<div className="my-8 px-4">
				<h2 className="text-2xl font-bold mb-4">Daily Quizzes</h2>
				<TestCardList tests={dailyQuizzes} />
			</div>
			<div className="my-8 px-4">
				<h2 className="text-2xl font-bold mb-4">Mock Tests</h2>
				<TestCardList tests={mockTests} />
			</div>
		</div>
	);
};

export default SSCPage;
