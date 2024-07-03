"use client";
import { useState, useEffect } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ResultsBarChart from "@/components/ResultsBarChart";
import { FaPaperPlane } from "react-icons/fa";
import useTestStore from "@/store/testStore";

export function PostSubmit() {
	const [isOpen, setIsOpen] = useState(false);
	const [currentTimeTaken, setCurrentTimeTaken] = useState(0);
	const {
		calculateScores,
		getTotalTime,
		getIsSubmitted,
		freezeAllTimers,
		getQuizStartTime,
		getFinalTimeTaken,
	} = useTestStore();

	useEffect(() => {
		const updateTimeTaken = () => {
			if (!getIsSubmitted()) {
				const startTime = getQuizStartTime();
				const currentTime = Date.now();
				const elapsedSeconds = Math.floor(
					(currentTime - startTime) / 1000
				);
				setCurrentTimeTaken(elapsedSeconds);
			}
		};

		const timer = setInterval(updateTimeTaken, 1000);

		return () => clearInterval(timer);
	}, [getIsSubmitted, getQuizStartTime]);

	const handleSubmit = () => {
		if (!getIsSubmitted()) {
			freezeAllTimers();
		}
		setIsOpen(true);
	};

	const scores = calculateScores();
	const { correct, wrong, unattempted } = scores.sectionScores.reduce(
		(acc, section) => {
			acc.correct += section.score;
			acc.wrong += section.answered - section.score;
			acc.unattempted += section.totalQuestions - section.answered;
			return acc;
		},
		{ correct: 0, wrong: 0, unattempted: 0 }
	);

	const totalTime = getTotalTime() * 60; // Convert minutes to seconds
	const timeTaken = getIsSubmitted() ? getFinalTimeTaken() : currentTimeTaken;

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button
					onClick={handleSubmit}
					className="flex items-center space-x-2 bg-primary text-white shadow-lg"
				>
					<FaPaperPlane />
					<span>{getIsSubmitted() ? "View Results" : "Submit"}</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-[80vh] max-h-[80vh]">
				<DrawerHeader>
					<DrawerTitle>Results Summary</DrawerTitle>
					<DrawerDescription>
						Here&apos;s a breakdown of your performance.
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4 overflow-y-auto flex-grow">
					<ResultsBarChart
						correct={correct}
						wrong={wrong}
						unattempted={unattempted}
						timeTaken={timeTaken}
						totalTime={totalTime}
					/>
				</div>
				<DrawerFooter>
					<div className="flex gap-4 justify-center">
						<Button onClick={() => setIsOpen(false)}>Close</Button>
						<Button>View Answers</Button>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
