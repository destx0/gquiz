import React, { useState, useEffect } from "react";
import useTestStore from "@/store/testStore";
import { Progress } from "@/components/ui/progress";
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
		<div className="bg-gray-50 px-4 py-2 rounded-md shadow-sm">
			<div className="flex items-center justify-between flex-wrap gap-2">
				<div className="flex items-center space-x-3">
					<div className="inline-flex items-center bg-blue-100 rounded-full px-2 py-1 text-xs text-blue-800">
						<Clock className="w-3 h-3 mr-1" />
						<span className="font-mono">
							{formatTime(questionElapsedTime)}
						</span>
					</div>
					<div className="flex items-center text-sm">
						<Clock className="w-4 h-4 text-gray-500 mr-1" />
						<span className="font-medium">
							{formatTime(globalTimeRemaining)}
						</span>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Badge
						variant="secondary"
						className="text-green-600 bg-green-100"
					>
						<CheckCircle className="w-3 h-3 mr-1" />+{positiveMarks}
					</Badge>
					<Badge
						variant="secondary"
						className="text-red-600 bg-red-100"
					>
						<XCircle className="w-3 h-3 mr-1" />-{negativeMarks}
					</Badge>
				</div>
			</div>
			<div className="mt-2">
				<Progress value={globalTimeProgress} className="h-1" />
			</div>
		</div>
	);
};

export default SecondaryHeader;
