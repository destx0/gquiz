import React, { useEffect, useState } from "react";
import useTestStore from "@/store/testStore";
import { Clock } from "lucide-react";

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
		<div className="inline-flex items-center bg-blue-100 rounded-full px-2 py-1 text-xs text-blue-800">
			<Clock className="w-3 h-3 mr-1" />
			<span className="font-mono">{formatTime(elapsedTime)}</span>
		</div>
	);
};

export default QuestionTimer;
