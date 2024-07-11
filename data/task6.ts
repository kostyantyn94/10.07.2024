function array_skip_until(
	arr: (string | number)[],
	value: string | number
): (string | number)[] {
	const index = arr.indexOf(value);

	if (index === -1) {
		return [];
	}

	return arr.slice(index);
}

function array_normalize(arr: any[], schema: any, transform: boolean): any[] {
	if (typeof schema !== "object" && !transform) {
		return arr.filter((el) => typeof el === schema);
	}

	if (typeof schema !== "object" && transform) {
		return arr.reduce((acc, cur) => {
			if (typeof cur === schema) {
				acc.push(cur);
				return acc;
			}
			if (typeof cur === "object") {
				return acc;
			}
			switch (schema) {
				case "string":
					acc.push(String(cur));
					break;
				case "number":
					acc.push(Number(cur));
					break;
				case "int":
					acc.push(parseInt(cur));
					break;
				case "float":
					acc.push(parseFloat(cur));
					break;
				case "bool":
					acc.push(Boolean(cur));
					break;
				case "function":
					acc.push(() => cur);
					break;
				default:
					return acc;
			}
			return acc;
		}, []);
	}

	return arr.reduce((acc, cur) => {
		if (typeof cur !== "object") {
			return acc;
		}
		for (const key in schema) {
			if (key in cur) {
				if (typeof cur[key] !== schema[key] && transform) {
					switch (schema[key]) {
						case "string":
							acc.push(String(cur[key]));
							break;
						case "number":
							acc.push(Number(cur[key]));
							break;
						case "int":
							acc.push(parseInt(cur[key]));
							break;
						case "float":
							acc.push(parseFloat(cur[key]));
							break;
						case "bool":
							acc.push(Boolean(cur[key]));
							break;
						case "function":
							acc.push(() => cur[key]);
							break;
						default:
							return acc;
					}
				}
				if (typeof cur[key] === schema[key]) {
					acc.push(cur[key]);
				}
			}
		}
		return acc;
	}, []);
}

function array_pluck(arr: any[], path: string) {
	const keys = path.split(".");

	return arr.reduce((acc, cur) => {
		let obj = cur;
		for (let key of keys) {
			if (key in obj) {
				obj = obj[key];
			} else {
				return undefined;
			}
		}
		acc.push(obj);
		return acc;
	}, []);
}

function array_combine(
	keys: (string | number)[],
	values: (string | number)[]
): Record<string | number, any> {
	const obj: Record<string | number, any> = {};
	let n = 0;

	for (let i = 0; i < keys.length; i++) {
		if (typeof keys[i] === "number" || typeof keys[i] === "string") {
			obj[keys[i]] = values[n];
			n++;
		}
	}

	return obj;
}
