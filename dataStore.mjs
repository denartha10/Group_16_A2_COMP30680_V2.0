import { createSignal, createEffect, createResource } from "../reactive.mjs";

// from where fetch occurs in html
const [source, setSource] = createSignal("../../senators.json");

// DATA SOURCE AS SIGNAL
// DATA VARIABLE GAS INITIAL VALUE OF LOADING
// IF THERE IS AN ERROR AN ERROR MESSAGE LOGGED TO CONSOLE AND DATA VALUE SET TO FALSE
// IF SUCCESSFUL DATA IS SET TO RETURNED JSON FROM ASYNC
const [data] = createResource(source, fetch);

// DERIVED STATE FROM DATA SOURCE
// LISTS OF OPTIONS TO BE SUPPLIED TO SELECT FIELDS
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
    : Array.from(
        new Set(["all", ...data().objects.map((e) => e.senator_rank_label)])
      );

const numberOfDemocraticSenators = () =>
  data() === "loading" || data() === false
    ? 99
    : data().objects.filter((e) => e.party == "Democrat").length;

const numberOfRepublicanSenators = () =>
  data() === "loading" || data() === false
    ? 0
    : data().objects.filter((e) => e.party == "Republican").length;

const numberOfIndependentSenators = () =>
  data() === "loading" || data() === false
    ? 0
    : data().objects.filter((e) => e.party == "Independent").length;


// FOR THE LEADERSHIP ROLE SECTION
// TWO PARTS THE LIST OF SENATORS WITH LEADERSHIP ROLES REDUCED TO {party, role, name}
// THEN THE CREATION OF AN OBJECT WITH PARTY AS KEY AND A LIST OF STRINGS FOR LIST
const listOfSenatorsWithLeadershipRollsWithNameAndParty = () =>
  data() === "loading" || data() === false
    ? {}
    : data()
        .objects.filter((senator) => senator.leadership_title !== null)
        .map((leadershipSenator) => ({
          party: leadershipSenator.party,
          role: leadershipSenator.leadership_title,
          name: `${leadershipSenator.person.firstname} ${leadershipSenator.person.lastname}`,
        }));

const objectOfSenatorsNamesAndLeadershipRollByParty =
  listOfSenatorsWithLeadershipRollsWithNameAndParty.reduce(
    (outputObject, currentObject) => {
      outputObject[currentObject.party] =
        outputObject[currentObject.party] !== undefined
          ? [
              ...outputObject[currentObject.party],
              `${currentObject.role} : ${currentObject.name}`,
            ]
          : [];
    },
    {}
  );

export {
  uniqueArrayOfParties,
  uniqueArrayOfStates,
  uniqueArrayOfRanks,
  numberOfRepublicanSenators,
  numberOfDemocraticSenators,
  numberOfIndependentSenators,
  objectOfSenatorsNamesAndLeadershipRollByParty
};
