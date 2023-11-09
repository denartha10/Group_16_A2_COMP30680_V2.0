import { createElement } from "../fógraJS/index.mjs";

import SenatorNumberSection from "./lib/SenatorNumberSectionComponent.mjs";
import LeadershipRollsSection from "./lib/LeadershipRollsSectionComponent.mjs";
import CustomSelect from "./lib/SelectComponent.mjs";
import PopupComponent from "./lib/PopupComponent.mjs";
import CardsGridComponent from "./lib/CardsGridComponent.mjs";
import SearchBar from "./lib/SearchBarComponent.mjs";

import {
	uniqueArrayOfParties,
	uniqueArrayOfRanks,
	uniqueArrayOfStates,
	setPartyValue,
	setStateValue,
	setRankValue,
	setSearchBarValue,
	searchBarValue
} from "./dataStore.mjs";

// CREATE TABLE SECTION USING CREATEELEMENT AND CUSTOM COMPONENTS
const tableSection = createElement(
	"section",
	{ id: "tablesection" },
	createElement("h2", {}, "Table of Senators"),
	createElement("div", {classList: "filter-boxes"}, SearchBar(searchBarValue,setSearchBarValue)),
	createElement(
		"div",
		{classList: "filter-boxes"},
		CustomSelect(uniqueArrayOfParties, {
			nameAndID: "party",
			classList: ["customselect"],
			bindValue: setPartyValue,
		}),
		CustomSelect(uniqueArrayOfStates, {
			nameAndID: "states",
			classList: ["customselect"],
			bindValue: setStateValue,
		}),
		CustomSelect(uniqueArrayOfRanks, { nameAndID: "ranks", classList: ["customselect"], bindValue: setRankValue })
	),
	CardsGridComponent()
);

// ADD SECTION TO THE BODY
document
	.getElementById("root")
	.append(
		createElement(
			"header",
			{ classList: ["hero"] },
			createElement("h1", {}, "Welcome to the U.S. Senators Directory"),
			createElement(
				"p",
				{},
				"Get to know the distinguished members of the United States Senate. Discover their affiliations, leadership roles, and more."
			)
		), // done
		SenatorNumberSection(), //done
		LeadershipRollsSection(), // done
		PopupComponent(),
		tableSection
	);
