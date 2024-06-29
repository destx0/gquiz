import React from "react";
import SSCHeader from "@/components/SSCHeader";
import TestCardList from "@/components/TestCardList";

const dailyQuizzes = [
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
];

const mockTests = [
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
];

const SSCPage = () => {
	return (
		<div>
			<SSCHeader />
			<div className="my-8 px-4">
				<TestCardList
					tests={dailyQuizzes}
					sectionTitle={"Daily Quizzes"}
				/>
			</div>
			<div className="my-8 px-4">
				<TestCardList tests={mockTests} sectionTitle={"Mock  Tests"} />
			</div>
		</div>
	);
};

export default SSCPage;
