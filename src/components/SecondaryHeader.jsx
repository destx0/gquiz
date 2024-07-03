import React, { useState, useEffect } from "react";
import useTestStore from "@/store/testStore";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const SecondaryHeader = ({ currentSectionIndex, currentQuestionIndex }) => {
	const {
		getElapsedTime,
		updateQuestionTimer,
		getQuizMetadata,
		getQuizStartTime,
		setTotalTimeTaken,
	} = useTestStore();

	const { totalTimeInMinutes, positiveMarks, negativeMarks } =
		getQuizMetadata();
	const quizStartTime = getQuizStartTime();

	const [globalTimeRemaining, setGlobalTimeRemaining] = useState(null);
	const [questionElapsedTime, setQuestionElapsedTime] = useState(null);
	const [totalTimeTaken, setLocalTotalTimeTaken] = useState(0);

	useEffect(() => {
		const initializeTimers = () => {
			const currentTime = Date.now();
			const elapsedSeconds = Math.floor(
				(currentTime - quizStartTime) / 1000
			);
			const remainingSeconds = Math.max(
				totalTimeInMinutes * 60 - elapsedSeconds,
				0
			);
			setGlobalTimeRemaining(remainingSeconds);
			setQuestionElapsedTime(
				getElapsedTime(currentSectionIndex, currentQuestionIndex)
			);
			setLocalTotalTimeTaken(elapsedSeconds);
		};

		initializeTimers();

		const timer = setInterval(() => {
			setGlobalTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
			setQuestionElapsedTime((prevTime) => {
				const newTime = prevTime + 1;
				updateQuestionTimer(
					currentSectionIndex,
					currentQuestionIndex,
					newTime
				);
				return newTime;
			});
			setLocalTotalTimeTaken((prevTime) => {
				const newTime = prevTime + 1;
				setTotalTimeTaken(newTime);
				return newTime;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [
		currentSectionIndex,
		currentQuestionIndex,
		updateQuestionTimer,
		quizStartTime,
		totalTimeInMinutes,
		getElapsedTime,
		setTotalTimeTaken,
	]);

	const formatTime = (time) => {
		if (typeof time !== "number" || isNaN(time)) {
			return "00:00";
		}
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<div className="bg-white px-4 py-2 flex items-center justify-between text-xs">
			<div className="inline-flex items-center bg-gray-100 rounded-full px-2 py-1 text-gray-600">
				<Clock className="w-3 h-3 mr-1" />
				<span>{formatTime(questionElapsedTime)}</span>
			</div>
			{globalTimeRemaining !== null && (
				<CountdownTimer
					remainingTime={globalTimeRemaining}
					totalTime={totalTimeInMinutes * 60}
				/>
			)}
			<div className="flex items-center space-x-2">
				<Badge
					variant="secondary"
					className="text-green-600 bg-green-100 h-6 px-2 flex items-center"
				>
					<CheckCircle className="w-3 h-3 mr-1" />+{positiveMarks}
				</Badge>
				<Badge
					variant="secondary"
					className="text-red-600 bg-red-100 h-6 px-2 flex items-center"
				>
					<XCircle className="w-3 h-3 mr-1" />-{negativeMarks}
				</Badge>
			</div>
		</div>
	);
};

export default SecondaryHeader;
