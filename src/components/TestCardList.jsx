import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Clock,
	HelpCircle,
	CheckSquare,
	ArrowRight,
	RefreshCw,
	BarChart2,
} from "lucide-react";

const getBadgeColor = (language) => {
	switch (language.toLowerCase()) {
		case "english":
			return "bg-blue-900 text-white";
		case "hindi":
			return "bg-green-900 text-white";
		default:
			return "bg-gray-500 text-white";
	}
};
const TestCardList = ({ tests, sectionTitle, description }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{sectionTitle}</CardTitle>
				<CardDescription className="text-sm text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{tests.map((test, index) => (
					<div key={index} className="p-4">
						<div>
							<div className="flex justify-between items-center pb-4">
								<div className="flex gap-2 items-center">
									<span className="text-xl font-semibold">
										{test.testName}
									</span>
									<div className="flex gap-2">
										{test.languages.map((language, idx) => (
											<Badge
												key={idx}
												className={getBadgeColor(
													language
												)}
											>
												{language}
											</Badge>
										))}
									</div>
								</div>
								{test.status === "completed" ? (
									<div className="flex space-x-2">
										<Button
											size="sm"
											variant="secondary"
											className="text-xs"
										>
											<BarChart2
												size={14}
												className="mr-1"
											/>
											Results
										</Button>
										<Button
											size="sm"
											variant="secondary"
											className="text-xs"
										>
											<RefreshCw
												size={14}
												className="mr-1"
											/>
											Retake
										</Button>
									</div>
								) : (
									<Button size="sm" className="text-xs">
										<ArrowRight
											size={14}
											className="mr-1"
										/>
										Start Now
									</Button>
								)}
							</div>
							<div className="flex gap-4">
								<div className="flex items-center">
									<CheckSquare size={16} className="mr-1" />
									<span className="text-gray-700 text-sm">
										{test.questions} Questions
									</span>
								</div>
								<div className="flex items-center">
									<Clock size={16} className="mr-1" />
									<span className="text-gray-700 text-sm">
										{test.time}
									</span>
								</div>
								<div className="flex items-center">
									<HelpCircle size={16} className="mr-1" />
									<span className="text-gray-700 text-sm">
										{test.questions} Questions
									</span>
								</div>
							</div>
						</div>
						{index < tests.length - 1 && (
							<Separator className="mt-4" />
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default TestCardList;
