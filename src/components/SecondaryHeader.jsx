import React, { useState, useEffect } from "react";
import useTestStore from "@/store/testStore";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const SecondaryHeader = ({ currentSectionIndex, currentQuestionIndex }) => {
	const {
		getElapsedTime,
		updateQuestionTimer,
		getQuizMetadata,
		getQuizStartTime,
	} = useTestStore();

	const { totalTimeInMinutes, positiveMarks, negativeMarks } =
		getQuizMetadata();
	const quizStartTime = getQuizStartTime();

	const [globalTimeRemaining, setGlobalTimeRemaining] = useState(
		totalTimeInMinutes * 60
	);
	const [questionElapsedTime, setQuestionElapsedTime] = useState(
		getElapsedTime(currentSectionIndex, currentQuestionIndex)
	);

	useEffect(() => {
		const globalTimer = setInterval(() => {
			const elapsedSeconds = Math.floor(
				(Date.now() - quizStartTime) / 1000
			);
			const remainingSeconds = Math.max(
				totalTimeInMinutes * 60 - elapsedSeconds,
				0
			);
			setGlobalTimeRemaining(remainingSeconds);
		}, 1000);

		const questionTimer = setInterval(() => {
			setQuestionElapsedTime((prevTime) => {
				const newTime = prevTime + 1;
				updateQuestionTimer(
					currentSectionIndex,
					currentQuestionIndex,
					newTime
				);
				return newTime;
			});
		}, 1000);

		return () => {
			clearInterval(globalTimer);
			clearInterval(questionTimer);
		};
	}, [
		currentSectionIndex,
		currentQuestionIndex,
		updateQuestionTimer,
		quizStartTime,
		totalTimeInMinutes,
	]);

	useEffect(() => {
		setQuestionElapsedTime(
			getElapsedTime(currentSectionIndex, currentQuestionIndex)
		);
	}, [currentSectionIndex, currentQuestionIndex, getElapsedTime]);

	const globalTimeProgress =
		(globalTimeRemaining / (totalTimeInMinutes * 60)) * 100;

	const formatTime = (time) => {
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
			<div className="relative w-24 h-6 bg-blue-100 rounded-full overflow-hidden">
				<div
					className="absolute inset-0 bg-blue-600"
					style={{
						clipPath: `inset(0 ${100 - globalTimeProgress}% 0 0)`,
					}}
				></div>
				<div className="absolute inset-0 flex items-center justify-center">
					<Clock className="w-3 h-3 mr-1 text-white" />
					<span
						className="font-medium"
						style={{
							color:
								globalTimeProgress > 50 ? "white" : "#1e40af",
						}}
					>
						{formatTime(globalTimeRemaining)}
					</span>
				</div>
			</div>
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
