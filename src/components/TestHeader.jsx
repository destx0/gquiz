import React from "react";
import { Button } from "@/components/ui/button";
import { PanelRightOpen, PanelRightClose } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import questions from "@/data/questions";
import useTestStore from "@/store/useTestStore";

const TestHeader = ({ setShowNavigation }) => {
	const { setCurrentSectionIndex, currentSectionIndex, showNavigation } =
		useTestStore();

	return (
		<div className="shadow-md p-4 flex items-center justify-between bg-gradient-to-r from-[#002219] via-[#0A0F0E] to-[#002219]">
			<div className="flex items-center">
				<img
					src="/infinity-icon.png"
					alt="Logo"
					className="h-8 mr-4 object-cover object-center"
				/>
				<div className="flex  overflow-x-auto">
					<Tabs
						defaultValue={currentSectionIndex.toString()}
						onValueChange={(value) =>
							setCurrentSectionIndex(parseInt(value))
						}
						className=""
					>
						<TabsList className="flex px-2 gap-2">
							{questions.map((section, index) => (
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
