import { createElement } from "../../fógraJS/index.mjs";

export default function SearchBar(bindValue) {
	const input = createElement("input", {
		classList: ["custom-input"],
		oninput: () => bindValue(input.value),
	});

	return input;
}
