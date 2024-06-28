// src/components/TestCardList.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Clock,
	HelpCircle,
	CheckSquare,
	ArrowRight,
	RefreshCw,
	BarChart2,
} from "lucide-react";

const TestCardList = ({ tests }) => {
	return (
		<div className="max-w-4xl mx-auto flex flex-col gap-4">
			{tests.map((test, index) => (
				<Card
					key={index}
					className="shadow-lg p-2 flex flex-col justify-between"
				>
					<div className="flex justify-between items-center pb-1">
						<div>
							<CardTitle className="text-xl font-bold">
								{test.testName}
							</CardTitle>
						</div>
						<div className="flex space-x-2">
							{test.status === "completed" ? (
								<Button
									size="sm"
									variant="secondary"
									className="text-xs"
								>
									<BarChart2 size={14} className="mr-1" />
									Results
								</Button>
							) : (
								<Button size="sm" className="text-xs">
									<ArrowRight size={14} className="mr-1" />
									Start Now
								</Button>
							)}
							{test.status === "completed" && (
								<Button
									size="sm"
									variant="outline"
									className="text-xs"
								>
									<RefreshCw size={14} className="mr-1" />
									Retake
								</Button>
							)}
						</div>
					</div>
					<CardContent className="flex flex-col space-y-1">
						<div className="flex flex-wrap items-center text-xs space-x-2">
							<div className="flex items-center space-x-1">
								<HelpCircle size={14} />
								<span>Questions: {test.questions}</span>
							</div>
							<div className="flex items-center space-x-1">
								<CheckSquare size={14} />
								<span>Marks: {test.marks}</span>
							</div>
							<div className="flex items-center space-x-1">
								<Clock size={14} />
								<span>Time: {test.time}</span>
							</div>
							<div className="flex space-x-1">
								{test.languages.map((language, idx) => (
									<Badge
										key={idx}
										variant="outline"
										className={
											language.toLowerCase() === "english"
												? "bg-blue-700 text-white"
												: "bg-green-700 text-white"
										}
									>
										{language}
									</Badge>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default TestCardList;
