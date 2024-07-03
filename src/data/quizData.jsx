const quizData = {
	name: "General Knowledge Quiz",
	description:
		"A comprehensive quiz covering General Knowledge, Science, Mathematics, and History topics.",
	language: "English",
	totalTimeInMinutes: 6,
	positiveMarks: 4,
	negativeMarks: 1,
	questions: [
		{
			section: "GK",
			questions: [
				{
					question:
						"Who is known as the Father of the Indian Nation?",
					options: [
						"Mahatma Gandhi",
						"Jawaharlal Nehru",
						"Sardar Patel",
						"Subhas Chandra Bose",
					],
					answerIndex: 0,
					explanation:
						"Mahatma Gandhi is known as the Father of the Indian Nation for his role in India's struggle for independence through non-violent civil disobedience.",
				},
				{
					question: "Which is the highest civilian award in India?",
					options: [
						"Bharat Ratna",
						"Padma Vibhushan",
						"Padma Bhushan",
						"Padma Shri",
					],
					answerIndex: 0,
					explanation:
						"The Bharat Ratna is the highest civilian award in India, awarded for exceptional service towards the advancement of art, literature, and science, and in recognition of public service of the highest order.",
				},
				{
					question: "What is the national animal of India?",
					options: ["Tiger", "Lion", "Elephant", "Peacock"],
					answerIndex: 0,
					explanation:
						"The tiger is the national animal of India, symbolizing strength, agility, and power.",
				},
				{
					question: "Who wrote the national anthem of India?",
					options: [
						"Rabindranath Tagore",
						"Bankim Chandra Chatterjee",
						"Sarojini Naidu",
						"Sarat Chandra Chattopadhyay",
					],
					answerIndex: 0,
					explanation:
						"Rabindranath Tagore wrote the national anthem of India, 'Jana Gana Mana'.",
				},
			],
		},
		{
			section: "Science",
			questions: [
				{
					question: "What is the chemical formula for water?",
					options: ["H2O", "CO2", "O2", "NaCl"],
					answerIndex: 0,
					explanation:
						"The chemical formula for water is H2O, indicating that each molecule of water is composed of two hydrogen atoms and one oxygen atom.",
				},
				{
					question: "What planet is known as the Red Planet?",
					options: ["Mars", "Earth", "Jupiter", "Venus"],
					answerIndex: 0,
					explanation:
						"Mars is known as the Red Planet because of its reddish appearance, which is due to iron oxide (rust) on its surface.",
				},
				{
					question: "What is the boiling point of water?",
					options: ["100°C", "0°C", "50°C", "37°C"],
					answerIndex: 0,
					explanation:
						"The boiling point of water is 100°C (212°F) at standard atmospheric pressure.",
				},
			],
		},
		{
			section: "Maths",
			questions: [
				{
					question: "What is 2 + 2?",
					options: ["3", "4", "5", "6"],
					answerIndex: 1,
					explanation: "2 + 2 equals 4.",
				},
				{
					question: "What is the square root of 16?",
					options: ["2", "4", "6", "8"],
					answerIndex: 1,
					explanation: "The square root of 16 is 4.",
				},
				{
					question: "What is 10 divided by 2?",
					options: ["2", "4", "5", "10"],
					answerIndex: 2,
					explanation: "10 divided by 2 equals 5.",
				},
				{
					question: "What is the value of pi (π)?",
					options: ["3.14", "2.14", "4.14", "1.14"],
					answerIndex: 0,
					explanation: "The value of pi (π) is approximately 3.14.",
				},
				{
					question: "What is 5 * 6?",
					options: ["30", "20", "10", "15"],
					answerIndex: 0,
					explanation: "5 multiplied by 6 equals 30.",
				},
			],
		},
		{
			section: "History",
			questions: [
				{
					question:
						"Who was the first president of the United States?",
					options: [
						"George Washington",
						"Thomas Jefferson",
						"Abraham Lincoln",
						"John Adams",
					],
					answerIndex: 0,
					explanation:
						"George Washington was the first president of the United States, serving from 1789 to 1797.",
				},
				{
					question: "In which year did World War II end?",
					options: ["1945", "1939", "1918", "1965"],
					answerIndex: 0,
					explanation: "World War II ended in 1945.",
				},
				{
					question: "Who discovered America?",
					options: [
						"Christopher Columbus",
						"Leif Erikson",
						"Marco Polo",
						"James Cook",
					],
					answerIndex: 0,
					explanation:
						"Christopher Columbus is credited with discovering America in 1492, although it is now known that other explorers, such as Leif Erikson, reached the continent earlier.",
				},
				{
					question: "Which ancient civilization built the pyramids?",
					options: ["Egyptian", "Roman", "Greek", "Mesopotamian"],
					answerIndex: 0,
					explanation:
						"The ancient Egyptian civilization built the pyramids.",
				},
				{
					question:
						"What was the first capital of the United States?",
					options: [
						"New York",
						"Philadelphia",
						"Washington D.C.",
						"Boston",
					],
					answerIndex: 0,
					explanation:
						"New York City was the first capital of the United States, before the capital was moved to Philadelphia and later to Washington D.C.",
				},
				{
					question: "Who was known as the Iron Lady?",
					options: [
						"Margaret Thatcher",
						"Indira Gandhi",
						"Golda Meir",
						"Angela Merkel",
					],
					answerIndex: 0,
					explanation:
						"Margaret Thatcher, the first female Prime Minister of the United Kingdom, was known as the Iron Lady due to her strong-willed leadership and uncompromising politics.",
				},
				{
					question: "When did the French Revolution begin?",
					options: ["1789", "1776", "1804", "1917"],
					answerIndex: 0,
					explanation:
						"The French Revolution began in 1789 and led to significant political and social change in France.",
				},
			],
		},
	],
};

export default quizData;
