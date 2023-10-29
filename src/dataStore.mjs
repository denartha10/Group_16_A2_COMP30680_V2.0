import { createSignal, createResource } from "../fógraJS/index.mjs";

// EVERYTHING INSIDE THIS DOCUMENT IS A SIGNAL
// THINK OF A SIGNAL AS A FUNCTION THAT RETURNS A VALUE
// WHEN YOU CREATE A SIGNAL YOU SET AN INITIAL VALUE FOR IT AND IT RETURNS AN ARRAY 
// THE ARRAY CONTAINS A FUNCTION RETURNING THE CURRENT VALUE () => VAL
// AND A FUNCTION THAT TAKES A VALUE AS A PARAMETER (VAL) => void
// I HAVE SPLIT THE FILE INTO SEPERATED PORTIONS EACH CONTAINING DATA FOR A SECTION OF THE PROJECT

// IF YOU CREATE A FUNCTION FROM A SIGNAL AND USE THE VALUE THAT FUNCTION RETURNS IN THE CODE THEN THE SIGNAL WILL MAINTAIN REFERENCE
// TO THAT FUNCTION RERUNNING IT WHEN THE VALUE OF THE SIGNAL IS SET
// const [a, setA] = createSignal(3)     --a = 3--
// const b = () => a()*2     --b is 3*2 or 6--
// 
// setA(4) --a() is now 4 and b() is now 8. if b was used in the code elsewhere that will be updated too--
// 
// THE createResource() IS BASICALLY A SIGNAL BUT ACCEPTS A FUNCTION RETURNING A PROMISE AND ARGUMENTS FOR THAT FETCH FUNCTION
// IT RETURNS A SIGNAL WHICH IS IN THREE STATES 
// "false" - meaning error
// "loading" - meaning (YOU GUESSED IT) the async function is running
// Data - the result of Promise<Data> resolving


// NOW THAT I HAVE OUTLINED THE BASIC FUNCTIONALITY HERE ARE THE SECTION
// THIS IS THE INITIAL JSON DATA FETCH
// ---------------------------------------------------------------------------------------------

const fetcher = async (s) => {
  const response = await fetch(s);
  
	if (!response.ok) {
    throw Error("FETCH FOR DATA FAILED");
	}
	const data = await response.json();
	return data;
};

const [source, _] = createSignal("../datasource/senators.json");
const [data] = createResource(source, fetcher);

// THIS SECTION CONTAINS THE OPTIONS FOR THE DROPDOWN AND SIGNALS TO BIND THE VALUE OF THE DROPDOWN TOO
// ---------------------------------------------------------------------------------------------
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

// FOR BINDING
const [partyValue, setPartyValue] = createSignal("all");
const [stateValue, setStateValue] = createSignal("all");
const [rankValue, setRankValue] = createSignal("all");


// THIS SECTION CONTAINS THE NUMBER OF DEMOCRATIC, REPUBLICAN AND INDEPENDENT SENATORS DERIVED FROM THE DATA
// ---------------------------------------------------------------------------------------------

const numberOfDemocraticSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Democrat").length;

const numberOfRepublicanSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Republican").length;

const numberOfIndependentSenators = () =>
	data() === "loading" || data() === false ? 0 : data().objects.filter((e) => e.party == "Independent").length;


// THE NEXT IS THE LIST OF SENATORS WITH LEADERSHIP ROLLS INCLUDING
// THEIR NAME, PARTY AND ROLE
// IT ALSO HAS AN OBJECT CONTAINING THE PARTIES WITH A LIST OF STRINGS CONTAINING THE ROLE AND NAME
// ---------------------------------------------------------------------------------------------


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



// NEXT IS THE REQUIRED DATA FOR THE TABLE
// WE HAVE THE DATA BEFORE FILTERING WHICH CONTAINS ALL SENATORS IN THE FORMAT FOR THE TABLE 
// AND THEN WE HAVE THE DATA FILTERED USING THE VALUES FROM EARLIER THAT ARE BOUND TO THE SELECT COMPONENTS
// ---------------------------------------------------------------------------------------------

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

// FINALLY WE HAVE POPUP DISPLAY SETTINGS WHICH IS ITS OWN SIGNAL CONTAINING A BOOLEAN FOR 
// OPEN : TRUE
// OSID: REFERENCE TO THE SENATOR
// POPUPDATA() IS THE DATA USED IN THE POPUP AND IS RETRIEVED USING OSID OF THE SENATOR
// ---------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------

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
