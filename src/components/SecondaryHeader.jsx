import React, { useEffect, useState } from "react";
import useTestStore from "@/store/testStore";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const SecondaryHeader = ({ currentSectionIndex, currentQuestionIndex }) => {
	const {
		getElapsedTime,
		updateQuestionTimer,
		getQuizMetadata,
		setTotalTimeTaken,
		areTimersFrozen,
		getGlobalTimeRemaining,
		updateGlobalTimeRemaining,
		getIsSubmitted,
	} = useTestStore();

	const { totalTimeInMinutes, positiveMarks, negativeMarks } =
		getQuizMetadata();
	const isSubmitted = getIsSubmitted();
	const timersFrozen = areTimersFrozen();

	const [globalTimeRemaining, setGlobalTimeRemaining] = useState(
		getGlobalTimeRemaining()
	);
	const [questionElapsedTime, setQuestionElapsedTime] = useState(
		getElapsedTime(currentSectionIndex, currentQuestionIndex)
	);

	useEffect(() => {
		if (!isSubmitted && !timersFrozen) {
			const timer = setInterval(() => {
				const newGlobalTimeRemaining = getGlobalTimeRemaining();
				setGlobalTimeRemaining(newGlobalTimeRemaining);

				if (newGlobalTimeRemaining <= 0) {
					clearInterval(timer);
				} else {
					updateGlobalTimeRemaining();
					const newElapsedTime =
						getElapsedTime(
							currentSectionIndex,
							currentQuestionIndex
						) + 1;
					updateQuestionTimer(
						currentSectionIndex,
						currentQuestionIndex,
						newElapsedTime
					);
					setQuestionElapsedTime(newElapsedTime);
					setTotalTimeTaken((prev) => prev + 1);
				}
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [
		currentSectionIndex,
		currentQuestionIndex,
		isSubmitted,
		timersFrozen,
		updateGlobalTimeRemaining,
		getGlobalTimeRemaining,
		updateQuestionTimer,
		getElapsedTime,
		setTotalTimeTaken,
	]);

	useEffect(() => {
		setQuestionElapsedTime(
			getElapsedTime(currentSectionIndex, currentQuestionIndex)
		);
	}, [currentSectionIndex, currentQuestionIndex, getElapsedTime]);

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
			<CountdownTimer
				remainingTime={globalTimeRemaining}
				totalTime={totalTimeInMinutes * 60}
			/>
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
