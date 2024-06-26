import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Question = ({
	question,
	options,
	selectedOptionIndex,
	onSelectOption,
}) => {
	return (
		<div className="p-4  rounded-lg">
			<h2 className="text-xl font-semibold mb-4">{question}</h2>
			<RadioGroup
				value={selectedOptionIndex}
				onValueChange={onSelectOption}
			>
				{options.map((option, index) => (
					<Label
						key={index}
						className="mb-2 flex items-center space-x-2"
					>
						<RadioGroupItem value={index} />
						<span>{option}</span>
					</Label>
				))}
			</RadioGroup>
		</div>
	);
};

export default Question;
