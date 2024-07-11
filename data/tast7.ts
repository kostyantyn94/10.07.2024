// 1
const lorem: string =
	"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, amet.";

function randomUsername(text: string): string {
	const words: string[] = text.split(/\W+/).filter((word) => word.length > 0);

	const index1: number = Math.floor(Math.random() * words.length);
	const index2: number = Math.floor(Math.random() * words.length);

	const firstWord: string =
		words[index1].charAt(0).toUpperCase() +
		words[index1].slice(1).toLowerCase();
	const secondWord: string =
		words[index2].charAt(0).toUpperCase() +
		words[index2].slice(1).toLowerCase();

	return firstWord.concat(" ", secondWord);
}

console.log(randomUsername(lorem));
console.log(randomUsername(lorem));

// 2
function randomMessage(text: string): string {
	const randomLengthStart: number = Math.floor(
		Math.random() * (text.length - 1)
	);
	const randomLengthEnd: number = Math.floor(Math.random() * randomLengthStart);
	return text.substring(randomLengthStart, randomLengthEnd);
}

console.log(randomMessage(lorem)); // Example output
console.log(randomMessage(lorem)); // Example output

// 3
function findWordIndex(text: string, word: string): number | string {
	if (text.includes(word)) {
		return text.indexOf(word);
	} else {
		return "слово не найдено";
	}
}

console.log(findWordIndex(lorem, "consectetur")); // индекс:28
console.log(findWordIndex(lorem, "123")); // слово не найдено

// 4
function countLetters(text: string, letter: string): number {
	const matches: RegExpMatchArray | null = text.match(new RegExp(letter, "gi"));
	return matches ? matches.length : 0;
}

console.log(countLetters(lorem, "s")); // 5
console.log(countLetters(lorem, "d")); // 2

// 5
function inputValidation(text: string): string {
	if (text.trim().length < 3) {
		return "too short";
	} else if (text.trim().length > 1000) {
		return "too long";
	} else {
		return text;
	}
}

console.log(inputValidation(" ab  ")); // 'too short'
console.log(inputValidation(lorem)); // 'lorem ...

// 6
function genRandomProfit(price: number): number[] {
	const pricesArray: number[] = [price];
	for (let i = 0; i < 4; i++) {
		const change: number = (Math.random() - 0.5) * 2;
		price += change;
		pricesArray.push(Math.round(price * 100) / 100);
	}
	return pricesArray;
}

console.log(genRandomProfit(54.8)); // 54.8, 55.15, 55.78, 56.43
console.log(genRandomProfit(127.8)); // 127.8 128.25 128.68 129.23

// 7
function genHexColor(): string {
	const symbols: string[] = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
	];
	return "#".concat(
		symbols[Math.floor(Math.random() * symbols.length)],
		symbols[Math.floor(Math.random() * symbols.length)],
		symbols[Math.floor(Math.random() * symbols.length)]
	);
}
console.log(genHexColor()); // #df8
console.log(genHexColor()); // #ef6

// 8
function uaCurrencyIntl(num: number): string {
	return "UAH".concat(" ", num.toFixed(2));
}

console.log(uaCurrencyIntl(123.131)); // "UAH 123.13"
console.log(uaCurrencyIntl(456.5631)); // "UAH 456.56"

// 9
function uaDateIntl(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit",
	};
	const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
		"uk-UA",
		options
	);
	return (
		formatter.format(date).charAt(0).toUpperCase() +
		formatter.format(date).slice(1)
	);
}

console.log(uaDateIntl(new Date())); // "чт, 13 червня о 18:22"

// 10
function findAllNumbers(text: string): string {
	const matches: RegExpMatchArray | null = text.match(/\d+/g);
	return matches ? matches.join("") : "";
}
console.log(findAllNumbers("123abc456def789")); // 123456789

// 11
function removeWord(text: string, word: string): string {
	return text
		.split(" ")
		.filter((elem) => word !== elem)
		.join(" ");
}
console.log(removeWord(lorem, "adipisicing")); // 'Lorem ipsum dolor sit, amet consectetur elit. Sequi, amet.';

// 12
function sortWordsByLength(text: string): string {
	const wordsArray: string[] = text.split(" ");
	wordsArray.sort((a, b) => a.length - b.length);

	return wordsArray.join(" ");
}
console.log(sortWordsByLength(lorem)); // sit, amet Lorem ipsum dolor elit. amet. Sequi, consectetur adipisicing

// 13
function reverseEveryWord(text: string): string {
	const wordsArray: string[] = text.split(" ");
	const reversedWords: string[] = wordsArray.map((word) =>
		word.split("").reverse().join("")
	);
	return reversedWords.join(" ");
}
console.log(reverseEveryWord(lorem)); // meroL muspi rolod ,tis tema rutetcesnoc gnicisipida .tile ,iuqeS .tema

// 14
function findLongestWord(text: string): string {
	const wordsArray: string[] = text
		.split(/\W+/)
		.filter((word) => word.length > 0);
	let longest: string = "";
	wordsArray.forEach((word) => {
		if (word.length > longest.length) {
			longest = word;
		}
	});
	return longest;
}
console.log(findLongestWord(lorem)); // 'consectetur'

// 15
function createDivsForEveryWord(text: string): string {
	const wordsArray: string[] = text.split(" ");
	const newWordsArray: string[] = wordsArray.map(
		(word) => `<div>${word}</div>`
	);
	return newWordsArray.join("");
}
console.log(createDivsForEveryWord(lorem));
// <div>Lorem</div><div>ipsum</div><div>dolor</div><div>sit,</div><div>amet</div>
// <div>consectetur</div><div>adipisicing</div><div>elit.</div><div>Sequi,</div><div>amet.</div>
