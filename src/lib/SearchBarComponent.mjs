import { createEffect, createElement } from "../../fógraJS/index.mjs";

export default function SearchBar(bindValue) {
	const input = createElement("input", {
		classList: ["custom-input"],
		placeholder: "Search the filtered data",
		oninput: () => bindValue(input.value),
	});

	return input;
}
