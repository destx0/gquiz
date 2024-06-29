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

const TestCardList = ({ tests, sectionTitle }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{sectionTitle}</CardTitle>
				<CardDescription>Some description text here</CardDescription>
			</CardHeader>
			<CardContent>
				{tests.map((test, index) => (
					<div key={index} className="p-4">
						<div className="flex justify-between items-center pb-4">
							<span className="text-xl font-semibold">
								{test.testName}
							</span>
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
						</div>
						{index < tests.length - 1 && <Separator />}
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default TestCardList;
