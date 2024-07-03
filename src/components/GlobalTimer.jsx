import React from "react";

const GlobalTimer = ({ timeRemaining }) => {
	const minutes = Math.floor(timeRemaining / 60);
	const seconds = timeRemaining % 60;

	return (
		<div className="text-xl font-bold">
			Time Remaining: {minutes.toString().padStart(2, "0")}:
			{seconds.toString().padStart(2, "0")}
		</div>
	);
};

export default GlobalTimer;
