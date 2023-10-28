import { createEffect, createElement } from "../fógra/index.mjs";
import { objectOfSenatorsNamesAndLeadershipRollByParty, listOfSenatorsWithLeadershipRollsWithNameAndParty } from "./dataStore.mjs";

const leaderShipPositionLists = () =>
  Object.entries(objectOfSenatorsNamesAndLeadershipRollByParty()).map(
    ([party, listOfRolesWithNames]) =>
      createElement(
        "div",
        {},
        createElement("h3", {}, party),
        createElement(
          "ul",
          {},
          ...listOfRolesWithNames.map((s) => createElement("li", {}, s))
        )
      )
  );

export default function LeadershipRollsSection() {
  const leadershipRollsSection = createElement("section", {
    id: "LeadershipRolls",
  });

  createEffect(() => {
    leadershipRollsSection.innerHTML = "";
    leadershipRollsSection.append(
      createElement("h2", {}, "Leadership Rolls"),
      ...leaderShipPositionLists()
    );
    (objectOfSenatorsNamesAndLeadershipRollByParty())
  });

  return leadershipRollsSection;
}
