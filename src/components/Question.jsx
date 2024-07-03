import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useTestStore from "@/store/testStore";

const Question = ({
	question,
	options,
	selectedOptionIndex,
	onSelectOption,
}) => {
	const isSubmitted = useTestStore((state) => state.getIsSubmitted());

	return (
		<div className="p-4 rounded-lg">
			<h2 className="text-xl font-semibold mb-4">{question}</h2>
			<RadioGroup
				value={selectedOptionIndex}
				onValueChange={isSubmitted ? undefined : onSelectOption}
				disabled={isSubmitted}
			>
				{options.map((option, index) => (
					<Label
						key={index}
						className={`mb-2 flex items-center space-x-2 ${
							isSubmitted
								? "cursor-not-allowed opacity-90"
								: "cursor-pointer"
						}`}
					>
						<RadioGroupItem value={index} disabled={isSubmitted} />
						<span>{option}</span>
					</Label>
				))}
			</RadioGroup>
		</div>
	);
};

export default Question;
