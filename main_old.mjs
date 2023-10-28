import { getTotalSenators, leadershipRolls, fetchData } from "./step1.mjs";
import { senatorWebpageData } from "./step2.mjs";
import { filterByParty, filterByState, filterByRank } from "./step3.mjs";
import { getMoreDetails } from "./step4.mjs";
import { createSignal, createEffect } from "./signals.mjs";

// Get the data from the JSON file
const data = await fetchData("./senators.json");

// using the data in the json we can make a set of all the parties
// a set of all the states
// a set of all the ranks
// These are going to be used as options in the filters and so the reasoning is creating a set guarantees no duplicates
const setOfParties = Array.from(new Set(data.objects.map((e) => e.party)));
const setOfState = Array.from(new Set(data.objects.map((e) => e.state)));
const setOfRank = Array.from(new Set(data.objects.map((e) => e.senator_rank_label)));

// The following functions take the sets and using the for each method
// will convert each entry to a html option tag with the corresponding value
// forEach unlike map is static and changes the values in place
// This is not the preffered option because I like immutable data
// so instead we converted the sets to arrays
// and then used map
const partyOptionTags = setOfParties.map((party) => {
    const newOption = document.createElement("option");
    newOption.id = party;
    newOption.innerText = party;
    return newOption;
});

const stateOptionTags = setOfState.map((state) => {
    const newOption = document.createElement("option");
    newOption.id = state;
    newOption.innerText = state;
    return newOption;
});

const rankOptionTags = setOfRank.map((rank) => {
    const newOption = document.createElement("option");
    newOption.id = rank;
    newOption.innerText = rank;
    return newOption;
});

// Finally we take the options of each of those tags and append tem to their respective dropdown
// spread syntax allows us to do that easily
document.getElementById("party").append(...partyOptionTags);
document.getElementById("state").append(...stateOptionTags);
document.getElementById("rank").append(...rankOptionTags);

// ------------------------------------------------------------------------------------------------

// Get the section for democrat numbers
const democratsNumberSection = document.querySelector("#NoInParty");

const senatorCountHeadings = Object.entries(getTotalSenators(data)).map(([key, value]) => {
    const h3 = document.createElement("h3");
    h3.innerText = `${key}: ${value}`;
    return h3;
});

democratsNumberSection.append(...senatorCountHeadings);

// ------------------------------------------------------------------------------------------------

const leaderShipPositions = Object.entries(leadershipRolls(data)).map(([key, value]) => {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const ul = document.createElement("ul");

    h3.innerText = `${key}s`;

    const liTags = Object.entries(value).map(([innerKey, innerValue]) => {
        const liTag = document.createElement("li");
        liTag.innerText = `${innerKey}: ${innerValue}`;
        return liTag;
    });

    ul.append(...liTags);
    div.append(h3, ul);

    return div;
});

document.getElementById("LeadershipRolls").append(...leaderShipPositions);

// ------------------------------------------------------------------------------------------------

// function to create the table
// TODO: Yeh I want to make thsi function better but I don't fucking know its heavy
function createTable(tableDataInput) {
    // table section
    const tableSection = document.getElementById("tablesection");

    // check table does not exist to remove duplicates
    const oldTable = document.getElementById("govenorTable");
    if (oldTable !== null) {
        oldTable.remove();
    }

    // create a table element
    const table = document.createElement("table");
    table.id = "govenorTable";

    if (tableDataInput.length > 0) {
        // make the header
        // get the keys
        const dataKeys = Object.keys(tableDataInput[0]);

        // make a thead and tr
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");

        // make the list of th's
        const thList = dataKeys.map((e) => {
            const th = document.createElement("th");
            th.innerText = e;
            return th;
        });

        tr.append(...thList);

        // append the th to the tr and tr to thead
        thead.append(tr);

        // start body
        const tbody = document.createElement("tbody");

        // make a array of rows
        const rows = tableDataInput.map((rowData) => {
            const tr = document.createElement("tr");
            const tdList = Object.values(rowData).map((cellData) => {
                const td = document.createElement("td");
                td.innerText = cellData;
                return td;
            });

            tr.id = rowData.osid;
            tr.addEventListener("click", moreInfo);
            tr.append(...tdList);
            return tr;
        });

        // tbody appended with rows
        tbody.append(...rows);

        // table appended with thead and tbody
        table.append(thead, tbody);
    }

    // append the table to the section
    tableSection.append(table);
}

// ------------------------------------------------------------------------------------------------

function moreInfo(e) {
    disableScroll()

    // e.target.parentNode.id
    const moreDetails = getMoreDetails(data, e.target.parentNode.id);

    const floatingDiv = document.createElement("div");
    floatingDiv.id = "floating";

    const floatingDivBackground = document.createElement("div");
    floatingDivBackground.id = "floatingBack";
    floatingDivBackground.addEventListener("click", closeDetails);

    const title = document.createElement("h4");
    title.style.textDecoration = "underline";
    title.innerText = "More Details";

    floatingDiv.append(
        title,
        ...Object.entries(moreDetails).map(([k, v]) => {
            if (e === "websiteLink") {
                const tag = document.createElement("a");
                tag.href = v;
                tag.innerText = `${k}: ${v}`;
                return tag;
            } else {
                const tag = document.createElement("p");
                tag.innerText = `${k}: ${v}`;
                return tag;
            }
        })
    );

    floatingDivBackground.append(floatingDiv);
    document.querySelector("body").append(floatingDivBackground);

}

// ------------------------------------------------------------------------------------------------

// Disable scrolling
function disableScroll() {
    // Get the current scroll position
    let scrollX = window.scrollX
    let scrollY = window.scrollY 
  
    // Scroll to the current position to prevent the page from jumping
    window.onscroll = function () {
      window.scrollTo(scrollX, scrollY);
    };
}
  
// Enable scrolling
function enableScroll() {
    window.onscroll = null;
}

function closeDetails() {
    document.getElementById("floating").remove();
    document.getElementById("floatingBack").remove();
    enableScroll();
}

// ------------------------------------------------------------------------------------------------

const [party, setParty] = createSignal("all");
const [state, setState] = createSignal("all");
const [rank, setRank] = createSignal("all");

// table data pre filtered
const filteredtableData = () => {
    let intermediaryData = senatorWebpageData(data);
    intermediaryData = filterByParty(intermediaryData, party());
    intermediaryData = filterByState(intermediaryData, state());
    intermediaryData = filterByRank(intermediaryData, rank());

    return intermediaryData
};

createEffect(() => {
    createTable(filteredtableData());
});

document.getElementById("party").addEventListener("change", () => {
    setParty(document.getElementById("party").value);
});
document.getElementById("rank").addEventListener("change", () => {
    setRank(document.getElementById("rank").value);
});
document.getElementById("state").addEventListener("change", () => {
    setState(document.getElementById("state").value);
});
