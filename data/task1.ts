/* Создайте веб-страницу, где пользователь может ввести пароль, а затем проверить его на соответствие следующим критериям:

Минимальная длина - 8 символов.
Содержит хотя бы одну заглавную букву.
Содержит хотя бы одну цифру.
Содержит хотя бы один специальный символ (!, @, #, $, %, ^, &, *, (, ), -, _).

Если пароль не соответствует требованиям, должно выводиться соответствующее сообщение.
*/

// Получаем DOM элементы

const input = document.getElementById("password") as HTMLInputElement;
const message = document.getElementById("message") as HTMLElement;

function validatePassword(password: string): string[] {
	let errors: string[] = [];

	if (password.length < 8) {
		errors.push("Password must be at least 8 characters long.");
	}
	if (!/[A-Z]/.test(password)) {
		errors.push("Password must contain at least one uppercase letter.");
	}
	if (!/[0-9]/.test(password)) {
		errors.push("Password must contain at least one digit.");
	}
	if (!/[!@#$%^&*()\-_=+]/.test(password)) {
		errors.push(
			"Password must contain at least one special character (!, @, #, $, %, ^, &, *, (, ), -, _)."
		);
	}

	return errors;
}

input.addEventListener("input", () => {
	const password: string = input.value;

	const validation: string[] = validatePassword(password);

	if (validation.length > 0) {
		message.innerHTML = validation.join("<br>");
		message.className = "error";
	} else {
		message.innerHTML = "Password is valid!";
		message.className = "success";
	}
});
