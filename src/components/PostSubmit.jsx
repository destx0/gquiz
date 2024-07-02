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
import useTestStore from "@/store/useTestStore"; // Adjust the import path as needed

export function PostSubmit() {
	const [isOpen, setIsOpen] = useState(false);
	const calculateScores = useTestStore((state) =>
		state.calculateScores()(state)
	);

	const handleSubmit = () => {
		setIsOpen(true);
	};

	const { correct, wrong, unattempted } =
		calculateScores.sectionScores.reduce(
			(acc, section) => {
				acc.correct += section.score;
				acc.wrong += section.answered - section.score;
				acc.unattempted += section.totalQuestions - section.answered;
				return acc;
			},
			{ correct: 0, wrong: 0, unattempted: 0 }
		);

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
						Here's a breakdown of your performance.
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">
					<ResultsBarChart
						correct={correct}
						wrong={wrong}
						unattempted={unattempted}
					/>
					<div className="mt-4">
						<h3 className="font-semibold">Section Scores:</h3>
						{calculateScores.sectionScores.map((section, index) => (
							<div key={index} className="flex justify-between">
								<span>{section.section}:</span>
								<span>
									{section.score} / {section.totalQuestions}
								</span>
							</div>
						))}
						<div className="mt-2 font-bold flex justify-between">
							<span>Total Score:</span>
							<span>
								{calculateScores.totalScore} /{" "}
								{calculateScores.totalQuestions}
							</span>
						</div>
					</div>
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
