"use client";

import React, { useState, useEffect } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const TestCarousel = () => {
	const [types, setTypes] = useState([]);

	useEffect(() => {
		const data = {
			types: [
				{
					typeName: "PYQ",
					tests: [
						{
							testName: "SSC PYQ Test 1",
							testId: "ssc_pyq_test_1",
						},
						{
							testName: "SSC PYQ Test 2",
							testId: "ssc_pyq_test_2",
						},
					],
				},
				{
					typeName: "Section-wise",
					tests: [
						{
							testName: "SSC Section Test 1",
							testId: "ssc_section_test_1",
						},
						{
							testName: "SSC Section Test 2",
							testId: "ssc_section_test_2",
						},
					],
				},
				{
					typeName: "Topic-wise",
					tests: [
						{
							testName: "SSC Topic Test 1",
							testId: "ssc_topic_test_1",
						},
						{
							testName: "SSC Topic Test 2",
							testId: "ssc_topic_test_2",
						},
					],
				},
			],
		};

		setTypes(data.types);
	}, []);

	useEffect(() => {
		console.log("Types:", types); // Debugging log to check types initialization
	}, [types]);

	return (
		<Carousel className="w-full max-w-lg mx-auto">
			<CarouselContent>
				{types.map((type, typeIndex) => (
					<div key={typeIndex} className="mb-4">
						<h2 className="text-xl font-bold mb-2">
							{type.typeName}
						</h2>
						{type.tests.map((test, testIndex) => (
							<CarouselItem
								key={testIndex}
								className="w-full p-2"
							>
								<Card>
									<CardContent className="flex flex-col items-center justify-center p-6">
										<span className="text-lg font-semibold">
											{test.testName}
										</span>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</div>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

export default TestCarousel;
