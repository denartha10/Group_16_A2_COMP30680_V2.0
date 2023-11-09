import { createEffect, createElement } from "../../fógraJS/index.mjs";

/**
 * Creates a select HTML element with options populated from a signal.
 *
 * @function 
 * @name SelectComponent
 * @param {Function} listOfOptionsSignal - A function that returns an array of options.
 * @param {Object} config - An object containing configuration options for the select element.
 * @param {string} config.nameAndID - The name and ID attribute for the select element.
 * @param {string} config.classList - The class attribute for the select element.
 * @param {()=>T} config.bindValue - A function to bind the selected value of the select element.
 * @returns {HTMLElement} The created select HTML element.
 */
function SelectComponent(listOfOptionsSignal, { nameAndID, classList, bindValue }) {
	const optionTags = () => listOfOptionsSignal().map((v) => createElement("option", { id: v }, v));

	// create the select tag
	const select = createElement("select", {
		id: nameAndID,
		name: nameAndID,
		classList: classList,
		onchange: () => bindValue(select.value),
	});

	select.append(...optionTags());

	// create option tags
	createEffect(() => {
		select.innerHTML = "";
		select.append(...optionTags());
	});

	return select;
}

export default SelectComponent;
