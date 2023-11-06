import { createEffect, createElement } from "../../fógraJS/index.mjs";
import { objectOfSenatorsNamesAndLeadershipRollByParty } from "../dataStore.mjs";

const leaderShipPositionLists = () =>
	Object.entries(objectOfSenatorsNamesAndLeadershipRollByParty()).map(([party, objectOfRolesNames]) =>
		createElement(
			"div",
			{},
			createElement("h3", { classList: "leader-party" }, party),
			createElement(
				"div",
				{ classList: ["leadership-parties"] },
				...Object.entries(objectOfRolesNames).map(([role, name]) =>
					createElement(
						"div",
						{ classList: ["leader"] },
						createElement("div", { classList: "leader-card leader-front" }, role),
						createElement("div", { classList: "leader-card leader-back" }, name)
					)
				)
			)
		)
	);

export default function LeadershipRollsSection() {
	const leadershipRollsSection = createElement("section", {
		id: "LeadershipRolls",
	});

	createEffect(() => {
		leadershipRollsSection.innerHTML = "";
		leadershipRollsSection.append(createElement("h2", {}, "Leadership Rolls"), ...leaderShipPositionLists());
		objectOfSenatorsNamesAndLeadershipRollByParty();
	});

	return leadershipRollsSection;
}
