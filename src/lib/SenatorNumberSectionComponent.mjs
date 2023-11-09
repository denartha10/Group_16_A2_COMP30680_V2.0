import { numberOfDemocraticSenators, numberOfIndependentSenators, numberOfRepublicanSenators } from "../dataStore.mjs";
import { createEffect, createElement } from "../../fógraJS/index.mjs";

/**
 * Creates a section HTML element displaying the number of senators in each party.
 *
 * This function uses the `createEffect` function to update the number of senators in each party whenever the data changes.
 *
 * @function
 * @name SenatorNumberSection
 * @returns {HTMLElement} The created section HTML element.
 */
export default function SenatorNumberSection() {
	const h3Democrats = createElement("h3", {classList: ["party"]}, `Democrats : ${numberOfDemocraticSenators()}`);
	const h3Republicans = createElement("h3", {classList: ["party"]}, `Republicans : ${numberOfRepublicanSenators()}`);
	const h3Independents = createElement("h3", {classList: ["party"]}, `Independents : ${numberOfIndependentSenators()}`);

	createEffect(() => {
		h3Democrats.innerText = `Democrats : ${numberOfDemocraticSenators()}`;
		h3Republicans.innerText = `Republicans : ${numberOfRepublicanSenators()}`;
		h3Independents.innerText = `Independents : ${numberOfIndependentSenators()}`;
	});

	return createElement(
		"section",
		{ id: "NoInParty" },
		createElement("h2", {}, "Number of Senators in each Party"),
		h3Democrats,
		h3Republicans,
		h3Independents
	);
}
