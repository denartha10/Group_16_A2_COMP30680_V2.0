import { createEffect, createElement } from "../../fógraJS/index.mjs";
import { 
	listOfSenatorsWithLeadershipRollsWithNameAndParty,
} from "../dataStore.mjs";

const leaderShipPositionLists = () => listOfSenatorsWithLeadershipRollsWithNameAndParty().map(leader => 
		createElement(
			"div", 
			{
				 classList: ["leader"],
			},
			createElement("div", { classList: "leader-card leader-front" }, leader.role),
			createElement("div", { classList: `leader-card leader-back ${leader.party.toLowerCase()}` }, leader.name)
		)
	)



export default function LeadershipRollsSection() {
	const leadershipParties = createElement("div", { classList: ["leadership-parties"] }, )

	createEffect(() => {
		leadershipParties.innerHTML = "";
		leadershipParties.append(...leaderShipPositionLists());
	});

	return createElement("section", {id: "LeadershipRolls",}, createElement("h2", {}, "Leadership Rolls"), leadershipParties);
}
