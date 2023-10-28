import { createEffect } from "../reactive.mjs";
import { objectOfSenatorsNamesAndLeadershipRollByParty } from "./dataStore.mjs";

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