import React from "react";
import { Clock } from "lucide-react";

const CountdownTimer = ({ remainingTime, totalTime }) => {
	const elapsedTimeProgress = ((totalTime - remainingTime) / totalTime) * 100;

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

	const displayTime = formatTime(remainingTime);

	return (
		<div className="relative w-28 h-6 bg-blue-500 rounded-full overflow-hidden">
			<div
				className="absolute inset-y-0 right-0 bg-red-500"
				style={{
					width: `${elapsedTimeProgress}%`,
				}}
			></div>
			<div className="absolute inset-0 flex items-center justify-center">
				<Clock className="w-3 h-3 mr-1 text-white" />
				<span className="text-white font-medium">{displayTime}</span>
			</div>
		</div>
	);
};

export default CountdownTimer;
