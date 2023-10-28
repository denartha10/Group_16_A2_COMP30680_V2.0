import { createElement } from "../fógra/index.mjs";

import SenatorNumberSection from "./SenatorNumberSectionComponent.mjs";
import LeadershipRollsSection from "./LeadershipRollsSectionComponent.mjs";
import CustomSelect from "./SelectComponent.mjs";
import TableComponent from "./TableComponent.mjs";
import PopupComponent from "./PopupComponent.mjs";

import {
  uniqueArrayOfParties,
  uniqueArrayOfRanks,
  uniqueArrayOfStates,
  setPartyValue,
  setStateValue,
  setRankValue
} from "./dataStore.mjs";

// CREATE TABLE SECTION USING CREATEELEMENT AND CUSTOM COMPONENTS
const tableSection = createElement(
  "section",
  { id: "tablesection" },
  createElement("h2", {}, "Table of Senators"),
  createElement(
    "div",
    {},
    CustomSelect(uniqueArrayOfParties, {nameAndID: "party", classList: ["customselect"], bindValue: setPartyValue}),
    CustomSelect(uniqueArrayOfStates, {nameAndID: "states", classList: ["customselect"], bindValue: setStateValue}),
    CustomSelect(uniqueArrayOfRanks, {nameAndID: "ranks", classList: ["customselect"], bindValue: setRankValue})
  ),
  TableComponent()
);

// ADD SECTION TO THE BODY
document
  .getElementById("bodyTag")
  .append(
    createElement("h1", {}, "Us Senators"),
    SenatorNumberSection(),
    LeadershipRollsSection(),
    PopupComponent(),
    tableSection
  );
