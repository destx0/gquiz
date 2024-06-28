// src/components/SSCHeader.jsx
"use client";

import React from "react";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const SSCHeader = () => {
	const router = useRouter();

	const handleSelectChange = (value) => {
		if (value !== "ssc") {
			alert("This exam is coming soon!");
			return;
		}
		router.push(`/${value}`);
	};

	return (
		<div className="relative shadow-md p-4 flex items-center justify-between bg-gradient-to-r from-[#354f52] via-[#84a98c] to-[#52796f]">
			<div className="flex items-center">
				<Select onValueChange={handleSelectChange} defaultValue="ssc">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select an exam" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Exams</SelectLabel>
							<SelectItem value="ssc">SSC</SelectItem>
							<SelectItem value="upsc" disabled>
								<span>
									UPSC
									<Badge variant="outline" className="ml-2">
										Coming Soon
									</Badge>
								</span>
							</SelectItem>
							<SelectItem value="ibps" disabled>
								<span>
									IBPS
									<Badge variant="outline" className="ml-2">
										Coming Soon
									</Badge>
								</span>
							</SelectItem>
							<SelectItem value="railway" disabled>
								<span>
									Railway
									<Badge variant="outline" className="ml-2">
										Coming Soon
									</Badge>
								</span>
							</SelectItem>
							<SelectItem value="defense" disabled>
								<span>
									Defense
									<Badge variant="outline" className="ml-2">
										Coming Soon
									</Badge>
								</span>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="absolute inset-0 flex justify-center items-center">
				<div className="flex items-center">
					<img
						src="/infinity-icon.png"
						alt="Logo"
						className="h-8 mr-4 object-cover object-center"
					/>
					<span className="hidden sm:inline text-white text-lg font-bold">
						Infinity Tests
					</span>
				</div>
			</div>
			<Avatar className="ml-4">
				<AvatarImage
					src="https://github.com/shadcn.png"
					alt="User Avatar"
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default SSCHeader;
