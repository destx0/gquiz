import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import questions from "@/data/questions";
import useTestStore from "@/store/useTestStore";

const TestHeader = ({ setShowNavigation }) => {
	const { setCurrentSectionIndex, showNavigation } = useTestStore();

	return (
		<div className="bg-gray-200 p-4 flex justify-between items-center">
			<div className="w-full md:w-auto">
				<Select
					onValueChange={(value) =>
						setCurrentSectionIndex(parseInt(value))
					}
					defaultValue="0"
				>
					<SelectTrigger className="w-full md:w-[180px]">
						<SelectValue placeholder="Select Section" />
					</SelectTrigger>
					<SelectContent>
						{questions.map((section, index) => (
							<SelectItem key={index} value={index.toString()}>
								{section.section}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Button onClick={() => setShowNavigation(!showNavigation)}>
				<Menu />
			</Button>
		</div>
	);
};

export default TestHeader;
