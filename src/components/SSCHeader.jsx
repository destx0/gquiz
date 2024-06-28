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
			alert("This section is coming soon!");
			return;
		}
		router.push(`/${value}`);
	};

	return (
		<div className="shadow-md p-4 flex items-center justify-between bg-gradient-to-r from-[#354f52] via-[#84a98c] to-[#52796f]">
			<div className="flex items-center">
				<img
					src="/infinity-icon.png"
					alt="Logo"
					className="h-8 mr-4 object-cover object-center"
				/>
				<span className="text-white text-2xl font-bold">
					Infinity Tests
				</span>
			</div>
			<div className="flex">
				<Select onValueChange={handleSelectChange} defaultValue="ssc">
					<SelectTrigger className="w-[180px] ml-4">
						<SelectValue placeholder="Select a section" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Sections</SelectLabel>
							<SelectItem value="ssc">SSC</SelectItem>
							<SelectItem value="upsc">
								UPSC
								<Badge variant="outline" className="ml-2">
									Coming Soon
								</Badge>
							</SelectItem>
							<SelectItem value="ibps">
								IBPS
								<Badge variant="outline" className="ml-2">
									Coming Soon
								</Badge>
							</SelectItem>
							<SelectItem value="railway">
								Railway
								<Badge variant="outline" className="ml-2">
									Coming Soon
								</Badge>
							</SelectItem>
							<SelectItem value="defense">
								Defense
								<Badge variant="outline" className="ml-2">
									Coming Soon
								</Badge>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Avatar className="ml-4">
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="User Avatar"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
};

export default SSCHeader;
