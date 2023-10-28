import createElement from "./HTMLGenerator.mjs";
import CustomSelect from "./CustomSelect.mjs";
import SenatorNumberSection from "./SenatorNumberSection.mjs";
import { uniqueArrayOfParties, uniqueArrayOfRanks, uniqueArrayOfStates} from "./dataStore.mjs";


// CREATE TABLE SECTION USING CREATEELEMENT AND CUSTOM COMPONENTS
const tableSection = createElement("section", { id: "tablesection" },
    createElement("h2", {}, "Table of Senators"),
    createElement("div", {},
        CustomSelect(uniqueArrayOfParties, "party", ["customselect"]),
        CustomSelect(uniqueArrayOfRanks, "ranks", ["customselect"]),
        CustomSelect(uniqueArrayOfStates, "states", ["customselect"])
    )
);

// ADD SECTION TO THE BODY
document.getElementById("bodyTag").append(
    createElement("h1", {} ,"Us Senators"),
    SenatorNumberSection(),
    tableSection
)