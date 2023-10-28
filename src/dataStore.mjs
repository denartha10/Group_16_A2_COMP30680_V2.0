import { createSignal, createResource } from "../fógraJS/index.mjs";
import { Data } from "./datasource/types.mjs";

const [source, _] = createSignal("../datasource/senators.json");

/**
 * Fetches data from a URL and returns it as JSON data of type Data.
 * @async
 * @param {string} s - The URL to fetch data from
 * @returns {Promise<Data>} - A promise that resolves to a Data object
 * @throws {Error} - If the fetch operation fails
 */
const fetcher = async (s) => {
	const response = await fetch(s);

	if (!response.ok) {
		throw Error("FETCH FOR DATA FAILED");
	}
	const data = await response.json();
	return data;
};

const [data] = createResource(source, fetcher);

/**
 * Returns an array of unique party names from the fetched data.
 * If the data is "loading" or false, it returns an array containing the string "all".
 * @returns {Data[]|["all"]} - An array containing the string "all" or the fetched parties as strings
 */
const uniqueArrayOfParties = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.party)]));

/**
 * Returns an array of unique state names from the fetched data.
 * If the data is "loading" or false, it returns an array containing the string "all".
 * @returns {string[]|["all"]} - An array containing the string "all" or the fetched states as strings
 */
const uniqueArrayOfStates = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.state)]));

/**
 * Returns an array of unique party names from the fetched data.
 * If the data is "loading" or false, it returns an array containing the string "all".
 * @returns {string[]|["all"]} - An array containing the string "all" or the fetched parties as strings
 */
const uniqueArrayOfRanks = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.senator_rank_label)]));

const [partyValue, setPartyValue] = createSignal("all");
const [stateValue, setStateValue] = createSignal("all");
const [rankValue, setRankValue] = createSignal("all");

/**
 * Returns the number of democratic senators in the data
 * If the data is "loading" or false, it returns 0
 * @returns {number}
 */
const numberOfDemocraticSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Democrat").length;

/**
 * Returns the number of republican senators in the data
 * If the data is "loading" or false, it returns 0
 * @returns {number}
 */
const numberOfRepublicanSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Republican").length;

/**
 * Returns the number of independent senators in the data
 * If the data is "loading" or false, it returns 0
 * @returns {number}
 */
const numberOfIndependentSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Independent").length;

/**
 * @typedef {Object} PartyLeadership
 * @property {string} party - The party of the senator.
 * @property {string} role - The leadership role of the senator.
 * @property {string} name - The name of the senator.
 *
 * @returns {LeadershipSenator[] | []} An array of senators with leadership roles.
 */
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

/**
 * @typedef {Object} PartyLeadershipByParty
 * @property {string} party - The party name.
 * @property {string[]} roles - An array of leadership roles and names.
 *
 * @returns {PartyLeadership| []} An object where the keys are party names and the values are arrays of leadership roles and names.
 */
const objectOfSenatorsNamesAndLeadershipRollByParty = () =>
	listOfSenatorsWithLeadershipRollsWithNameAndParty().reduce((outputObject, currentObject) => {
		outputObject[currentObject.party] =
			outputObject[currentObject.party] !== undefined
				? [...outputObject[currentObject.party], `${currentObject.role} : ${currentObject.name}`]
				: [];

		return outputObject;
	}, {});


/**
 * @typedef {Object} SenatorTableData
 * @property {string} name - The name of the senator.
 * @property {string} party - The party of the senator.
 * @property {string} state - The state of the senator.
 * @property {string} gender - The gender of the senator.
 * @property {string} rank - The rank of the senator.
 * @property {string} osid - The osid of the senator.
 *
 * @returns {SenatorData[] | []} An array of objects, each representing a senator with properties: name, party, state, gender, rank, and osid.
 */
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


/**
 * 
 * @returns {SenatorTableData[] | []}
 */
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
