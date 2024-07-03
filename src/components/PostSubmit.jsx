"use client";
import { useState } from "react";
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
	const calculateScores = useTestStore((state) => state.calculateScores);
	const getTotalTimeTaken = useTestStore((state) => state.getTotalTimeTaken);
	const getTotalTime = useTestStore((state) => state.getTotalTime);

	const handleSubmit = () => {
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

	const timeTaken = getTotalTimeTaken();
	const totalTime = getTotalTime() * 60; // Convert minutes to seconds

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button
					onClick={handleSubmit}
					className="flex items-center space-x-2 bg-primary text-white shadow-lg"
				>
					<FaPaperPlane />
					<span>Submit</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Results summary</DrawerTitle>
					<DrawerDescription>
						Here&apos;s a breakdown of your performance.
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">
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
						<Button>Answers</Button>
						<Button>Result analysis</Button>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
