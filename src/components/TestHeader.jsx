"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PanelRightOpen, PanelRightClose } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import quizData from "@/data/quizData"; // Updated import
import useTestStore from "@/store/testStore";

const TestHeader = ({ setShowNavigation }) => {
	const { setCurrentSectionIndex, currentSectionIndex, showNavigation } =
		useTestStore();

	return (
		<div className="shadow-md p-4 flex items-center justify-between bg-gradient-to-r from-[#002219] via-[#0A0F0E] to-[#002219]">
			<div className="flex items-center">
				<Image
					src="/infinity-icon.png"
					alt="Logo"
					width={32}
					height={32}
					className="mr-4 object-cover object-center"
				/>
				<div className="flex overflow-x-auto">
					<Tabs
						defaultValue={currentSectionIndex.toString()}
						onValueChange={(value) =>
							setCurrentSectionIndex(parseInt(value))
						}
						className=""
					>
						<TabsList className="flex px-2 gap-2">
							{quizData.questions.map((section, index) => (
								<TabsTrigger
									key={index}
									value={index.toString()}
								>
									{section.section.split(" ")[0]}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>
			</div>
			<Button
				className="ml-4 flex-shrink-0 shadow-md"
				onClick={() => setShowNavigation(!showNavigation)}
			>
				{showNavigation ? <PanelRightClose /> : <PanelRightOpen />}
			</Button>
		</div>
	);
};

export default TestHeader;
