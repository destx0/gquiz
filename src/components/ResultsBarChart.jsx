import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
		labels: ["Time Distribution"],
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

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	const commonOptions = {
		indexAxis: "y",
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: "bottom",
			},
		},
		scales: {
			x: {
				beginAtZero: true,
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
	};

	const resultsOptions = {
		...commonOptions,
		plugins: {
			...commonOptions.plugins,
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || "";
						if (label) {
							label += ": ";
						}
						if (context.parsed.x !== null) {
							label += context.parsed.x.toFixed(0);
							label += " questions";
						}
						return label;
					},
				},
			},
		},
		scales: {
			...commonOptions.scales,
			x: {
				...commonOptions.scales.x,
				ticks: {
					callback: function (value) {
						return value.toFixed(0);
					},
				},
			},
		},
	};

	const timeOptions = {
		...commonOptions,
		plugins: {
			...commonOptions.plugins,
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || "";
						if (label) {
							label += ": ";
						}
						if (context.parsed.x !== null) {
							label += formatTime(context.parsed.x);
						}
						return label;
					},
				},
			},
		},
		scales: {
			...commonOptions.scales,
			x: {
				...commonOptions.scales.x,
				ticks: {
					callback: function (value) {
						return formatTime(value);
					},
				},
			},
		},
	};

	const totalScore = correct - wrong;

	return (
		<div className="chart-container">
			<div className="chart-wrapper">
				<h2>
					Quiz Results (Total Score:{" "}
					<span className="font-semibold">{totalScore}</span>)
				</h2>
				<Bar options={resultsOptions} data={resultsData} />
			</div>
			<div className="chart-wrapper">
				<h2>
					Time Distribution (Time Taken:{" "}
					<span className="font-semibold">
						{formatTime(timeTaken)}
					</span>
					)
				</h2>
				<Bar options={timeOptions} data={timeData} />
			</div>
		</div>
	);
};

export default ResultsBarChart;
