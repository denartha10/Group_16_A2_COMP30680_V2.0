import { filteredData, setPopupDisplaySettings } from "../dataStore.mjs";
import { createEffect, createElement } from "../../fógraJS/index.mjs";

/**
 * Creates a grid of card components using the filteredData internally.
 *
 * This function creates a grid of card components, each containing information about a senator.
 * The cards use the filteredData internally and can set values for the popup display.
 * The function has no arguments but returns an HTML div containing the cards.
 *
 * @function
 * @name CardsGridComponent
 * @returns {HTMLElement} The div element containing the grid of card components.
 */
export default function CardsGridComponent() {
	const tableGrid = createElement("div", { classList: "table-grid" });

	const gridItemList = () =>
		filteredDataForTable().length > 0
			? filteredDataForTable().map((senData) =>
					createElement(
						"div",
						{
							classList: `senator-card ${senData.party.toLowerCase()}`,
							id: senData.osid,
						},
						createElement(
							"div",
							{ classList: "senator-card-pic" },
							createElement("img", {
								src: senData.pic,
								alt: `Picture of ${senData.name}`,
							})
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
								createElement("div", {
									classList: "more-info",
									onclick: () => {
										setPopupDisplaySettings({ open: true, osid: senData.osid });
									},
								})
							)
						)
					)
			  )
			: [];

	tableGrid.append(...gridItemList());

	createEffect(() => {
		tableGrid.innerHTML = "";
		tableGrid.append(...gridItemList());
	});

	return tableGrid;
}
