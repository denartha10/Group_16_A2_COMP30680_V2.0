import { createEffect, createElement } from "../../fógraJS/index.mjs";
import { listOfSenatorsWithLeadershipRollsWithNameAndParty } from "../dataStore.mjs";

/**
 * Creates a leadership roll card section.
 *
 * This function creates a section with a list of leadership roll cards. Each card reveals a senator's name on hover.
 * The cards are accented with colors indicating the senator's party: red for republican, blue for democrat, and grey for independent.
 * The function has no arguments but returns an HTML section.
 *
 * @function
 * @name LeadershipRollsSection
 * @returns {HTMLElement} The section element containing the leadership roll cards.
 */
export default function LeadershipRollsSection() {
	const leadershipParties = createElement("div", { classList: ["leadership-parties"] });

	const leaderShipPositionLists = () =>
		listOfSenatorsWithLeadershipRollsWithNameAndParty().map((leader) =>
			createElement(
				"div",
				{
					classList: ["leader"],
				},
				createElement("div", { classList: "leader-card leader-front" }, leader.role),
				createElement(
					"div",
					{ classList: `leader-card leader-back ${leader.party.toLowerCase()}` },
					leader.name
				)
			)
		);

	createEffect(() => {
		leadershipParties.innerHTML = "";
		leadershipParties.append(...leaderShipPositionLists());
	});

	return createElement(
		"section",
		{ id: "LeadershipRolls" },
		createElement("h2", {}, "Leadership Rolls"),
		leadershipParties
	);
}
