import { createSignal, createResource } from "../fógraJS/index.mjs";


const [source, _] = createSignal("../datasource/senators.json");


const fetcher = async (s) => {
	const response = await fetch(s);

	if (!response.ok) {
		throw Error("FETCH FOR DATA FAILED");
	}
	const data = await response.json();
	return data;
};

const [data] = createResource(source, fetcher);


const uniqueArrayOfParties = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.party)]));


const uniqueArrayOfStates = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.state)]));


const uniqueArrayOfRanks = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.senator_rank_label)]));

const [partyValue, setPartyValue] = createSignal("all");
const [stateValue, setStateValue] = createSignal("all");
const [rankValue, setRankValue] = createSignal("all");


const numberOfDemocraticSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Democrat").length;

const numberOfRepublicanSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Republican").length;

const numberOfIndependentSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Independent").length;


const listOfSenatorsWithLeadershipRollsWithNameAndParty = () =>
	data() === "loading" || data() === false
		? []
		: data()
				.objects.filter((senator) => senator.leadership_title !== null)
				.map((leadershipSenator) => ({
					party: leadershipSenator.party,
					role: leadershipSenator.leadership_title,
					name: `${leadershipSenator.person.firstname} ${leadershipSenator.person.lastname}`,
				}));


const objectOfSenatorsNamesAndLeadershipRollByParty = () =>
	listOfSenatorsWithLeadershipRollsWithNameAndParty().reduce((outputObject, currentObject) => {
		outputObject[currentObject.party] =
			outputObject[currentObject.party] !== undefined
				? [...outputObject[currentObject.party], `${currentObject.role} : ${currentObject.name}`]
				: [];

		return outputObject;
	}, {});



const dataForTableBeforeFiltering = () =>
	data() === "loading" || data() === false
		? []
		: data().objects.map((e) => ({
				name: `${e.person.firstname} ${e.person.lastname}`,
				party: e.party,
				state: e.state,
				gender: e.person.gender,
				rank: e.senator_rank_label,
				osid: e.person.osid,
		  }));



const filteredDataForTable = () => {
	const [party, state, rank] = [partyValue(), stateValue(), rankValue()];
	return dataForTableBeforeFiltering()
		.filter((e) => (party === "all" ? true : party === e.party))
		.filter((e) => (state === "all" ? true : state === e.state))
		.filter((e) => (rank === "all" ? true : rank === e.rank));
};

//this did not work and I need to figure out why. think its to do with nesting
// const filteredDataForTable = () =>
//   dataForTableBeforeFiltering()
//     .filter((e) => (partyValue() === "all" ? true : partyValue() === e.party))
//     .filter((e) => (stateValue() === "all" ? true : stateValue() === e.state))
//     .filter((e) => (rankValue() === "all" ? true : rankValue() === e.rank));

const [popupDisplaySettings, setPopupDisplaySettings] = createSignal({
	open: false,
	osid: "",
});



const popupData = () =>
	data() === "loading" || data() === false
		? {}
		: data()
				.objects.filter((e) => e.person.osid === popupDisplaySettings().osid)
				.map((e) => ({
					office: e.extra.office,
					dob: e.person.birthday,
					startDate: e.startdate,
					twitterId: e.person?.twitterid ?? "Not Available/None",
					youtubeId: e.person?.youtubeid ?? "Not available/None",
					websiteLink: e.website,
				}))[0];



export {
	uniqueArrayOfParties,
	uniqueArrayOfStates,
	uniqueArrayOfRanks,
	numberOfRepublicanSenators,
	numberOfDemocraticSenators,
	numberOfIndependentSenators,
	objectOfSenatorsNamesAndLeadershipRollByParty,
	listOfSenatorsWithLeadershipRollsWithNameAndParty,
	filteredDataForTable,
	setPartyValue,
	setStateValue,
	setRankValue,
	popupData,
	popupDisplaySettings,
	setPopupDisplaySettings,
};
