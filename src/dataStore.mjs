import { createSignal, createResource } from "../fógraJS/index.mjs";

/**
 * @typedef {() => T} SignalGetter
 * @template T
 */

/**
 * @typedef {(T) => void} SignalSetter
 * @template T
 */

/**
 * @typedef {() => (U | 'loading' | false)} ResourceGetter
 * @template U
 */

/**
 * Fetches data from a given source.
 *
 * This function fetches data from a given source and returns a promise that resolves to the JSON data.
 * If the fetch fails, it throws an error.
 *
 * @function
 * @name fetcher
 * @param {string} s - The source to fetch data from.
 * @returns {Promise} A promise that resolves to the JSON data.
 */
const fetcher = async (s) => {
	const response = await fetch(s);

	if (!response.ok) {
		throw Error("FETCH FOR DATA FAILED");
	}

	const data = await response.json();
	return data;
};

/**
 * Creates a signal for the source of the data.
 *
 * This function creates a signal for the source of the data, which is initially set to "../datasource/senators.json".
 *
 * @variable
 * @name source
 * @type {[SignalGetter<string>, SignalSetter<string>]}
 */
const [source, _] = createSignal("../datasource/senators.json");

/**
 * Creates a resource for the data.
 *
 * This function creates a resource for the data, using the source signal and the fetcher function.
 *
 * @variable
 * @name data
 * @type {[ResourceGetter]}
 */
const [data] = createResource(source, fetcher);

/**
 * Returns a unique array of parties.
 *
 * This signal returns a unique array of parties derived from the data signal.
 *
 * @variable
 * @name uniqueArrayOfParties
 * @returns {SignalGetter<string[]>} An array of unique parties.
 */
const uniqueArrayOfParties = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.party)]));

/**
 * Returns a unique array of states.
 *
 * This signal returns a unique array of states derived from the data signal.
 *
 * @variable
 * @name uniqueArrayOfStates
 * @returns {SignalGetter<string[]>} An array of unique states.
 */
const uniqueArrayOfStates = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.state)]));

/**
 * Returns a unique array of ranks.
 *
 * This signal returns a unique array of ranks derived from the data signal.
 *
 * @variable
 * @name uniqueArrayOfRanks
 * @returns {SignalGetter<string[]>} An array of unique ranks.
 */
const uniqueArrayOfRanks = () =>
	data() === "loading" || data() === false
		? ["all"]
		: Array.from(new Set(["all", ...data().objects.map((e) => e.senator_rank_label)]));




/**
 * Creates a signal for the currently selected party.
 *
 * This function creates a signal getter and setter for the currently selected party.
 *
 * @variable
 * @name partyValue
 * @type {[SignalGetter<string>, SignalSetter<string>]}
 */
const [partyValue, setPartyValue] = createSignal("all");

/**
 * Creates a signal for the currently selected state.
 *
 * This function creates a signal getter and setter for the currently selected state.
 *
 * @variable
 * @name stateValue
 * @type {[SignalGetter<string>, SignalSetter<string>]}
 */
const [stateValue, setStateValue] = createSignal("all");

/**
 * Creates a signal for the currently selected rank.
 *
 * This function creates a signal getter and setter for the currently selected rank.
 *
 * @variable
 * @name rankValue
 * @type {[SignalGetter<string>, SignalSetter<string>]}
 */
const [rankValue, setRankValue] = createSignal("all");

/**
 * Creates a signal for the currently selected search value.
 *
 * This function creates a signal getter and setter for the currently selected search value.
 *
 * @variable
 * @name searchValue
 * @type {[SignalGetter<string>, SignalSetter<string>]}
 */
const [searchBarValue, setSearchBarValue] = createSignal("");



/**
 * Returns the number of democratic senators.
 *
 * This signal returns an integer representing the number of democrats.
 *
 * @variable
 * @name numberOfDemocraticSenators
 * @returns {SignalGetter<number>}
 */
const numberOfDemocraticSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Democrat").length;

/**
 * Returns the number of republicans senators.
 *
 * This signal returns an integer representing the number of republicans.
 *
 * @variable
 * @name numberOfRepublicanSenators
 * @returns {SignalGetter<number>}
 */
const numberOfRepublicanSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Republican").length;

/**
 * Returns the number of independent senators.
 *
 * This signal returns an integer representing the number of independents.
 *
 * @variable
 * @name numberOfIndependentSenators
 * @returns {SignalGetter<number>}
 */
const numberOfIndependentSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Independent").length;



/**
 * @typedef {Object} LeadershipData
 * @property {string} party - The party of the senator.
 * @property {string} role - The leadership role of the senator.
 * @property {string} name - The name of the senator.
 * @property {string} osid - The osid of the senator.
 */

/**
 * 
 * This signal returns an array of leadership data for the leadership section.
 *
 * @variable
 * @name listOfSenatorsWithLeadershipRollsWithNameAndParty
 * @returns {SignalGetter<Array<LeadershipData>>} An array of objects, each representing a senator with a leadership role.
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
					osid: leadershipSenator.person.osid,
				}));

/**
 * @typedef {Object} UnfilteredData
 * @property {string} name - The name of the senator.
 * @property {string} party - The party of the senator.
 * @property {string} state - The state of the senator.
 * @property {string} gender - The gender of the senator.
 * @property {string} rank - The rank of the senator.
 * @property {string} osid - The osid of the senator.
 * @property {string} pic - The URL of the senator's picture.
 */

/**
 * This signal returns an array of Unfiltered data for the Senator data section.
 *
 * @variable
 * @name dataBeforeFiltering
 * @returns {SignalGetter<Array<UnfilteredData>>} An array of objects, each representing a senator with a leadership role.
 */
const dataBeforeFiltering = () =>
	data() === "loading" || data() === false
		? []
		: data().objects.map((e) => ({
				name: `${e.person.firstname} ${e.person.lastname}`,
				party: e.party,
				state: e.state,
				gender: e.person.gender,
				rank: e.senator_rank_label,
				osid: e.person.osid,
				pic: `https://www.govtrack.us/static/legislator-photos/${e.person.link.slice(-6)}-200px.jpeg`,
		  }));

/**
 * This signal returns an array of filtered data for the Senator data section.
 *
 * @variable
 * @name filteredData
 * @returns {SignalGetter<Array<UnfilteredData>>} A filtered array of objects, each representing a senator with a leadership role.
 */
const filteredData = () => {
	const [party, state, rank, search] = [partyValue(), stateValue(), rankValue(), searchBarValue()];
	return dataBeforeFiltering()
		.filter((e) => (party === "all" ? true : party === e.party))
		.filter((e) => (state === "all" ? true : state === e.state))
		.filter((e) => (rank === "all" ? true : rank === e.rank))
		.filter((e) =>
			search === "" ? true : Object.values(e).join(",").toLowerCase().includes(search.toLowerCase())
		);
};

/**
 * Creates a signal for the currently popupDisplaySettings.
 *
 * @variable
 * @name popupDisplaySettings
 * @type {[SignalGetter<{open: boolean, osid: string}>, SignalSetter<string>]}
 */
const [popupDisplaySettings, setPopupDisplaySettings] = createSignal({
	open: false,
	osid: "",
});

/**
 * @typedef {Object} PopupData
 * @property {string} office - The office of the senator.
 * @property {string} dob - The date of birth of the senator.
 * @property {string} startDate - The start date of the senator's term.
 * @property {string} twitterId - The Twitter ID of the senator.
 * @property {string} youtubeId - The YouTube ID of the senator.
 * @property {string} websiteLink - The website link of the senator.
 */

/**
 * Returns the data for the popup.
 *
 * This function returns the data for the popup, which includes the office, date of birth, start date, Twitter ID,
 * YouTube ID, and website link of the senator. If the data is loading or false, it returns an empty object.
 *
 * @function
 * @name popupData
 * @returns {SignalGetter<PopupData>} An object representing the popup data.
 */
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
	// For the select dropdowns
	uniqueArrayOfParties, // An array of all the parties for the dropdown
	uniqueArrayOfStates, // An array of all the states for the dropdown
	uniqueArrayOfRanks, // An array of all the ranks for the dropdown

	// Data for the number of senators section
	numberOfRepublicanSenators, // The number of Republicans in the dataset
	numberOfDemocraticSenators, // The number of Democrats in the dataset
	numberOfIndependentSenators, // The number of Independents in the dataset

	// Data for the leadership section
	listOfSenatorsWithLeadershipRollsWithNameAndParty, // list of all the senators with leadership rolls and their names

	// Data for the section containing the senator data
	filteredData, // This contains all the data to be displayed about the senatators

	// setters for the parameters used to filter the data
	setPartyValue, // A setter for the selected party value signal
	setStateValue, // A setter for the selected state value signal
	setRankValue, // A setter for the selected rank value signal
	setSearchBarValue, // A setter for the search query value signal

	// geters for the parameters used to filter the data
	searchBarValue, // A getter fo the search query value signal

	// A getter which represents the popup data
	popupData, // A getter for the th signal containing the data to be displayed in the popup

	// A getter and setter for the popup display settings
	popupDisplaySettings, // A getter for the data representing the popup display
	setPopupDisplaySettings, // A setter for the data representing the popup display
};
