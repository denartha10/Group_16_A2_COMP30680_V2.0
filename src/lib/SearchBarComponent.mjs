import { createEffect, createElement } from "../../fógraJS/index.mjs";

/**
 * Creates a search bar component.
 *
 * This function creates an input element that can be used to search the filtered data.
 * It takes two arguments: getValue and setValue, which are functions used to get and set the value of the search bar.
 * The function returns an HTML input element.
 *
 * @function
 * @name SearchBar
 * @param {Function} valueGetter - A signal getter to get the current value of the search bar.
 * @param {Function} valueSetter - A signal setter to set the value of the search bar.
 * @returns {HTMLElement} The input element for the search bar.
 */
export default function SearchBar(valueGetter, valueSetter) {
	const input = createElement("input", {
		classList: ["custom-input"],
		placeholder: "Search the filtered data",
		oninput: () => valueSetter(input.value),
	});

	createEffect(()=>{
		input.value = ""
		input.value = valueGetter()
	})

	return input;
}


