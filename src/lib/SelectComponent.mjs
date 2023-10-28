import { createEffect, createElement } from "../../fógra/index.mjs";

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
