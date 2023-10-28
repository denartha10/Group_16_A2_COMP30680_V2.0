import { numberOfDemocraticSenators, numberOfIndependentSenators, numberOfRepublicanSenators } from "../dataStore.mjs";
import { createEffect, createElement } from "../../fógra/index.mjs";

export default function SenatorNumberSection() {
	const h3Democrats = createElement("h3", {}, `Democrats : ${numberOfDemocraticSenators()}`);
	const h3Republicans = createElement("h3", {}, `Republicans : ${numberOfRepublicanSenators()}`);
	const h3Independents = createElement("h3", {}, `Independents : ${numberOfIndependentSenators()}`);

	createEffect(() => {
		h3Democrats.innerText = `Democrats : ${numberOfDemocraticSenators()}`;
		h3Republicans.innerText = `Republicans : ${numberOfRepublicanSenators()}`;
		h3Independents.innerText = `Independents : ${numberOfIndependentSenators()}`;
	});

	return createElement(
		"section",
		{ id: "NoInParty" },
		createElement("h2", {}, "Number in Parties"),
		h3Democrats,
		h3Republicans,
		h3Independents
	);
}
