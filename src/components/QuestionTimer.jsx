import React, { useEffect, useState } from "react";
import useTestStore from "@/store/testStore";
import { Clock } from "lucide-react"; // Assuming you're using lucide-react for icons

const QuestionTimer = ({ sectionIndex, questionIndex }) => {
	const { getElapsedTime, updateQuestionTimer } = useTestStore();
	const [elapsedTime, setElapsedTime] = useState(
		getElapsedTime(sectionIndex, questionIndex)
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setElapsedTime((prevTime) => {
				const newTime = prevTime + 1;
				updateQuestionTimer(sectionIndex, questionIndex, newTime);
				return newTime;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [sectionIndex, questionIndex, updateQuestionTimer]);

	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<div className="flex items-center justify-center p-2">
			<div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-3 flex items-center space-x-2">
				<Clock className="text-white w-5 h-5" />
				<span className="text-xl font-semibold text-white font-mono tracking-wider">
					{formatTime(elapsedTime)}
				</span>
			</div>
		</div>
	);
};

export default QuestionTimer;
