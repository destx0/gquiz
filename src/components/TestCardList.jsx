// src/components/TestCardList.jsx
import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Clock,
	HelpCircle,
	CheckSquare,
	ArrowRight,
	BarChart2,
} from "lucide-react";

const TestCardList = ({ tests }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{tests.map((test, index) => (
				<Card
					key={index}
					className="shadow-lg flex flex-col justify-between p-4"
				>
					<CardHeader className="pb-2">
						<CardTitle>{test.testName}</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col space-y-2 pb-2">
						<div className="flex justify-between items-center text-sm">
							<div className="flex items-center space-x-1">
								<HelpCircle size={16} />
								<span>Questions: {test.questions}</span>
							</div>
							<div className="flex items-center space-x-1">
								<CheckSquare size={16} />
								<span>Marks: {test.marks}</span>
							</div>
						</div>
						<div className="flex justify-between items-center text-sm">
							<div className="flex items-center space-x-1">
								<Clock size={16} />
								<span>Time: {test.time}</span>
							</div>
							<div className="flex space-x-1">
								{test.languages.map((language, idx) => (
									<Badge key={idx} variant="outline">
										{language}
									</Badge>
								))}
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end space-x-2">
						{test.status === "completed" ? (
							<Button size="sm" variant="secondary">
								<BarChart2 size={16} className="mr-2" />
								Results
							</Button>
						) : (
							<Button size="sm">
								<ArrowRight size={16} className="mr-2" />
								Start Now
							</Button>
						)}
						{test.status === "completed" && (
							<Button size="sm" variant="outline">
								<ArrowRight size={16} className="mr-2" />
								Retake
							</Button>
						)}
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default TestCardList;
