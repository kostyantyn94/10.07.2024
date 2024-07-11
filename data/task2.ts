/*
Создайте веб-страницу для игры "Угадай число".
 Компьютер загадывает случайное число в диапазоне от 1 до 100, а пользователь должен угадать это число.
П осле каждой попытки должно отображаться сообщение о том, больше ли загаданное число или меньше введенного пользователем.
Иг ра продолжается до тех пор, пока пользователь не угадает число.

*/

const input2 = document.getElementById("number") as HTMLInputElement;
const message2 = document.getElementById("message") as HTMLElement;
const btn = document.getElementById("btn") as HTMLButtonElement;

const randomNumber: number = Math.ceil(Math.random() * 100);

let attempts: number = 0;

function checkGuess(): void {
	const userGuess: number = parseInt(input2.value);
	attempts++;

	if (userGuess < 1 || userGuess > 100) {
		message2.innerText = "Пожалуйста, введите число в диапазоне от 1 до 100.";
		return;
	}

	if (userGuess < randomNumber) {
		message2.innerText = "Загаданное число больше.";
	} else if (userGuess > randomNumber) {
		message2.innerText = "Загаданное число меньше.";
	} else {
		message2.innerText = `Поздравляю, вы угадали число ${randomNumber} за ${attempts} попыток!`;
	}
}

btn.addEventListener("click", checkGuess);
