import { filteredDataForTable, setPopupDisplaySettings } from "../dataStore.mjs";
import { createEffect, createElement } from "../../fógraJS/index.mjs";

export default function CardsGridComponent() {
	const gridcontainer = createElement("div", { id: "senatorGrid" });

	const gridItemList = () =>
		filteredDataForTable().length > 0
			? filteredDataForTable().map((divData) =>
					createElement(
						"div",
						{
							id: divData.osid ?? "",
							classList: [divData.party.toLowerCase()],
							onclick: () => {
								setPopupDisplaySettings({ open: true, osid: trRowObject.osid });
							},
						},
						createElement(
							"ul",
							{},
							...Object.entries(divData).map(([cellDataKey, cellDataValue]) =>
								createElement("li", {}, `${cellDataKey}: ${cellDataValue}`)
							)
						)
					)
			  )
			: [];

	gridcontainer.append(...gridItemList());

	createEffect(() => {
		filteredDataForTable();
		gridcontainer.innerHTML = "";
		gridcontainer.append(...gridItemList());
	});

	return gridcontainer;
}
