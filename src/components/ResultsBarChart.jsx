import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const ResultsBarChart = ({
	correct,
	wrong,
	unattempted,
	timeTaken,
	totalTime,
}) => {
	const resultsData = {
		labels: ["Quiz Results"],
		datasets: [
			{
				label: "Correct",
				data: [correct],
				backgroundColor: "rgba(0, 128, 0, 0.8)",
				borderColor: "rgba(0, 128, 0, 1)",
				borderWidth: 1,
			},
			{
				label: "Wrong",
				data: [wrong],
				backgroundColor: "rgba(255, 0, 0, 0.8)",
				borderColor: "rgba(255, 0, 0, 1)",
				borderWidth: 1,
			},
			{
				label: "Unattempted",
				data: [unattempted],
				backgroundColor: "rgba(255, 165, 0, 0.8)",
				borderColor: "rgba(255, 165, 0, 1)",
				borderWidth: 1,
			},
		],
	};

	const timeData = {
		labels: ["Time Taken"],
		datasets: [
			{
				label: "Time Taken",
				data: [timeTaken],
				backgroundColor: "rgba(0, 128, 0, 0.8)",
				borderColor: "rgba(0, 128, 0, 1)",
				borderWidth: 1,
			},
			{
				label: "Remaining Time",
				data: [totalTime - timeTaken],
				backgroundColor: "rgba(255, 165, 0, 0.8)",
				borderColor: "rgba(255, 165, 0, 1)",
				borderWidth: 1,
			},
		],
	};

	const commonOptions = {
		indexAxis: "y",
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || "";
						if (label) {
							label += ": ";
						}
						if (context.parsed.x !== null) {
							label += context.parsed.x;
						}
						return label;
					},
				},
			},
		},
		scales: {
			x: {
				beginAtZero: true,
				stacked: true,
			},
			y: {
				stacked: true,
				barThickness: 1,
			},
		},
		elements: {
			bar: {
				borderRadius: 0,
				borderSkipped: false,
			},
		},
	};

	// Calculate total score
	const totalScore = correct - wrong; // Assuming 1 point for correct and -1 for wrong

	// Format time taken
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	return (
		<div className="chart-container">
			<div className="chart-wrapper">
				<h2>
					Quiz Results (Total Score:{" "}
					<span className="font-semibold">{totalScore}</span>)
				</h2>
				<Bar
					options={{
						...commonOptions,
						plugins: {
							...commonOptions.plugins,
							title: { display: true, text: "Quiz Results" },
						},
					}}
					data={resultsData}
				/>
			</div>
			<div className="chart-wrapper">
				<h2>
					Time Taken (Time Taken:{" "}
					<span className="font-semibold">
						{formatTime(timeTaken)}
					</span>
					)
				</h2>
				<Bar
					options={{
						...commonOptions,
						plugins: {
							...commonOptions.plugins,
							title: { display: true, text: "Time Taken" },
						},
					}}
					data={timeData}
				/>
			</div>
		</div>
	);
};

export default ResultsBarChart;
