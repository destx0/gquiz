import React, { useState, useEffect } from "react";
import QuestionTimer from "@/components/QuestionTimer";
import GlobalTimer from "@/components/GlobalTimer";

const SecondaryHeader = ({
	quizData,
	currentSectionIndex,
	currentQuestionIndex,
}) => {
	const [globalTimeRemaining, setGlobalTimeRemaining] = useState(
		quizData.totalTimeInMinutes * 60
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setGlobalTimeRemaining((prevTime) =>
				prevTime > 0 ? prevTime - 1 : 0
			);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const currentQuestion =
		quizData.questions[currentSectionIndex].questions[currentQuestionIndex];

	return (
		<div className="bg-gray-100 p-4 mb-4">
			<p>
				Marks: +{quizData.positiveMarks} for correct, -
				{quizData.negativeMarks} for incorrect
			</p>
			<div className="flex justify-between items-center mt-4">
				<QuestionTimer
					key={`${currentSectionIndex}-${currentQuestionIndex}`}
					initialTime={currentQuestion.timeLimit || 60}
					onTimeUpdate={() => {}} // You can add logic here if needed
				/>
				<GlobalTimer timeRemaining={globalTimeRemaining} />
			</div>
		</div>
	);
};

export default SecondaryHeader;
