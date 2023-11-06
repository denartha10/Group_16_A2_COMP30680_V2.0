import { filteredDataForTable, setPopupDisplaySettings } from "../dataStore.mjs";
import { createEffect, createElement } from "../../fógraJS/index.mjs";

export default function CardsGridComponent() {
	const tableGrid = createElement("div", { classList: "table-grid" });

	const gridItemList = () =>
		filteredDataForTable().length > 0
			? filteredDataForTable().map((senData) =>
					createElement(
						"div",
						{ classList: `senator-card ${senData.party.toLowerCase()}` },
						createElement(
							"div",
							{ classList: "senator-card-pic" },
							createElement(
								"img",
								{
									src: senData.pic,
									alt: `Picture of ${senData.name}`,
								}
							)
						),
						createElement(
							"div",
							{ classList: "senator-card-details" },
							createElement("h4", {}, senData.name),
							createElement(
								"div",
								{ classList: "senator-card-details-sub" },
								createElement("p", {}, senData.rank),
								createElement("p", {}, senData.state),
								createElement(
									"div",
									{
										classList: "more-info",
										onclick: () => {
											setPopupDisplaySettings({ open: true, osid: senData.osid });
										},
									}
								)
							)
						)
					)
			  )
			: [];

	tableGrid.append(...gridItemList());

	createEffect(() => {
		filteredDataForTable();
		tableGrid.innerHTML = "";
		tableGrid.append(...gridItemList());
	});

	return tableGrid;
}
