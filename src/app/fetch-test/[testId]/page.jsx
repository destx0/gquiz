import { Suspense } from "react";
import TestContent from "./TestContent";

export default function TestPage({ params }) {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Test Page</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<TestContent testId={params.testId} />
			</Suspense>
		</div>
	);
}
