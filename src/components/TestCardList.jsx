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

const TestCardList = ({ tests }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{tests.map((test, index) => (
				<Card
					key={index}
					className="shadow-lg flex flex-col justify-between"
				>
					<CardHeader>
						<CardTitle>{test.testName}</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col space-y-2">
						<div className="flex justify-between">
							<div>
								<span className="font-medium">Questions: </span>
								{test.questions}
							</div>
							<div>
								<span className="font-medium">Time: </span>
								{test.time}
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex space-x-1">
								{test.languages.map((language, idx) => (
									<Badge key={idx} variant="outline">
										{language}
									</Badge>
								))}
							</div>
							<Button size="sm" variant="primary">
								{test.status === "completed"
									? "Retake"
									: "Start Now"}
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default TestCardList;
