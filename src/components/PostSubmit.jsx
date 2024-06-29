"use client";
import { useState } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ResultsBarChart from "@/components/ResultsBarChart";
import {
	FaArrowRight,
	FaTimesCircle,
	FaStar,
	FaPaperPlane,
} from "react-icons/fa";
export function PostSubmit() {
	const [isOpen, setIsOpen] = useState(false);

	const openDrawer = () => setIsOpen(true);
	const closeDrawer = () => setIsOpen(false);
	const correct = 12; // Replace with your actual data
	const wrong = 5; // Replace with your actual data
	const unattempted = 3; // Replace with your actual data
	const timeTaken = 30; // Replace with your actual data (in minutes)
	const totalTime = 60; // Replace with your actual data (in minutes)

	return (
		<>
			<Drawer>
				<DrawerTrigger>
					<Button className="flex items-center space-x-2 bg-primary text-white shadow-lg">
						<FaPaperPlane />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Results summary</DrawerTitle>
						<DrawerDescription>
							This action cannot be undone.
						</DrawerDescription>
						<div className="p-2 align-center justify-center">
							<ResultsBarChart
								correct={correct}
								wrong={wrong}
								unattempted={unattempted}
								timeTaken={timeTaken}
								totalTime={totalTime}
							/>
						</div>
					</DrawerHeader>
					<DrawerFooter>
						<div className="flex gap-4 justify-center">
							<Button>Answers</Button>
							<Button>Result analysis</Button>
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
