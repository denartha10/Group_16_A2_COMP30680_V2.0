### Table of Contents

*   [createElement][1]
    *   [Parameters][2]
*   [createSignal][3]
    *   [Parameters][4]
*   [createEffect][5]
    *   [Parameters][6]
*   [createResource][7]
    *   [Parameters][8]
*   [Meta][9]
    *   [Properties][10]
*   [Extra][11]
    *   [Properties][12]
*   [Person][13]
    *   [Properties][14]
*   [Senator][15]
    *   [Properties][16]
*   [Data][17]
    *   [Properties][18]
*   [fetcher][19]
    *   [Parameters][20]
*   [uniqueArrayOfParties][21]
*   [uniqueArrayOfStates][22]
*   [uniqueArrayOfRanks][23]
*   [numberOfDemocraticSenators][24]
*   [numberOfRepublicanSenators][25]
*   [numberOfIndependentSenators][26]
*   [PartyLeadership][27]
    *   [Properties][28]
*   [PartyLeadershipByParty][29]
    *   [Properties][30]
*   [SenatorTableData][31]
    *   [Properties][32]
*   [filteredDataForTable][33]
<br/>
<br/>
<br/>

# DOM CREATION

## createElement

Description

### Parameters

*   `tag` **[string][34]** Any valid name for an HTML element tag
*   `attrs` **Record<[string][34], any>** An object of HTML element object attributes
*   `children` **...([HTMLElement][35] | [string][34])** Any HTMLElement or a string

Returns **[HTMLElement][35]**&#x20;

<br/>
<br/>
<br/>

# REACTIVE PRIMITIVES

## createSignal

Creates a signal with an initial value.

### Parameters

*   `initialValue` **T** The initial value of the signal.

## createEffect

Creates an effect.

### Parameters

*   `callback` &#x20;

## createResource

Creates a resource which is a signal returning the result of a Promise.

### Parameters

*   `source` &#x20;
*   `fetcher` &#x20;


<br/>
<br/>
<br/>

# JSON DATA STRUCTURE

## Meta

Type: [Object][36]

### Properties

*   `limit` **[number][37]** The limit of the data
*   `offset` **[number][37]** The offset of the data
*   `total_count` **[number][37]** The total count of the data

## Extra

Type: [Object][36]

### Properties

*   `address` **[string][34]** The address of the senator
*   `contact_form` **[string][34]** The contact form URL
*   `fax` **[string][34]** The fax number
*   `office` **[string][34]** The office of the senator
*   `rss_url` **[string][34]?** The RSS URL of the senator

## Person

Type: [Object][36]

### Properties

*   `bioguideid` **[string][34]** The bioguide ID of the senator
*   `birthday` **[string][34]** The birthday of the senator
*   `cspanid` **[number][37]** The C-SPAN ID of the senator
*   `firstname` **[string][34]** The first name of the senator
*   `gender` **[string][34]** The gender of the senator
*   `gender_label` **[string][34]** The gender label of the senator
*   `lastname` **[string][34]** The last name of the senator
*   `link` **[string][34]** The link to the senator's profile
*   `middlename` **[string][34]** The middle name of the senator
*   `name` **[string][34]** The name of the senator
*   `namemod` **[string][34]** The name modifier of the senator
*   `nickname` **[string][34]** The nickname of the senator
*   `osid` **[string][34]** The OS ID of the senator
*   `pvsid` **[string][34]** The PVS ID of the senator
*   `sortname` **[string][34]** The sort name of the senator
*   `twitterid` **[string][34]** The Twitter ID of the senator
*   `youtubeid` **[string][34]** The YouTube ID of the senator

## Senator

Type: [Object][36]

### Properties

*   `caucus` **[string][34]?** The caucus of the senator
*   `congress_numbers` **[Array][38]<[number][37]>** The congress numbers of the senator
*   `current` **[boolean][39]** Whether the senator is current
*   `description` **[string][34]** The description of the senator
*   `district` **[string][34]?** The district of the senator
*   `enddate` **[string][34]** The end date of the senator's role
*   `extra` **[Extra][11]** The extra information of the senator
*   `leadership_title` **[string][34]?** The leadership title of the senator
*   `party` **[string][34]** The party of the senator
*   `person` **[Person][13]** The person information of the senator
*   `phone` **[string][34]** The phone number of the senator
*   `role_type` **[string][34]** The role type of the senator
*   `role_type_label` **[string][34]** The role type label of the senator
*   `senator_class` **[string][34]** The senator class of the senator
*   `senator_class_label` **[string][34]** The senator class label of the senator
*   `senator_rank` **[string][34]** The senator rank of the senator
*   `senator_rank_label` **[string][34]** The senator rank label of the senator
*   `startdate` **[string][34]** The start date of the senator's role
*   `state` **[string][34]** The state of the senator
*   `title` **[string][34]** The title of the senator
*   `title_long` **[string][34]** The long title of the senator
*   `website` **[string][34]** The website of the senator

## Data

Type: [Object][36]

### Properties

*   `meta` **[Meta][9]** The metadata of the data
*   `objects` **[Array][38]<[Senator][15]>** The objects in the data

<br/>
<br/>
<br/>

# dataStore.js

## fetcher

Fetches data from a URL and returns it as JSON data of type Data.

### Parameters

*   `s` **[string][34]** The URL to fetch data from

<!---->

*   Throws **[Error][40]** If the fetch operation fails

Returns **[Promise][41]<[Data][17]>** A promise that resolves to a Data object

## uniqueArrayOfParties

Returns an array of unique party names from the fetched data.
If the data is "loading" or false, it returns an array containing the string "all".

Returns **([Array][38]<[Data][17]> | \[`"all"`])** An array containing the string "all" or the fetched parties as strings

## uniqueArrayOfStates

Returns an array of unique state names from the fetched data.
If the data is "loading" or false, it returns an array containing the string "all".

Returns **([Array][38]<[string][34]> | \[`"all"`])** An array containing the string "all" or the fetched states as strings

## uniqueArrayOfRanks

Returns an array of unique party names from the fetched data.
If the data is "loading" or false, it returns an array containing the string "all".

Returns **([Array][38]<[string][34]> | \[`"all"`])** An array containing the string "all" or the fetched parties as strings

## numberOfDemocraticSenators

Returns the number of democratic senators in the data
If the data is "loading" or false, it returns 0

Returns **[number][37]**&#x20;

## numberOfRepublicanSenators

Returns the number of republican senators in the data
If the data is "loading" or false, it returns 0

Returns **[number][37]**&#x20;

## numberOfIndependentSenators

Returns the number of independent senators in the data
If the data is "loading" or false, it returns 0

Returns **[number][37]**&#x20;

## PartyLeadership

Type: [Object][36]

### Properties

*   `party` **[string][34]** The party of the senator.
*   `role` **[string][34]** The leadership role of the senator.
*   `name` **[string][34]** The name of the senator.

Returns **([Array][38]\<LeadershipSenator> | \[])** An array of senators with leadership roles.

## PartyLeadershipByParty

Type: [Object][36]

### Properties

*   `party` **[string][34]** The party name.
*   `roles` **[Array][38]<[string][34]>** An array of leadership roles and names.

Returns **([PartyLeadership][27] | \[])** An object where the keys are party names and the values are arrays of leadership roles and names.

## SenatorTableData

Type: [Object][36]

### Properties

*   `name` **[string][34]** The name of the senator.
*   `party` **[string][34]** The party of the senator.
*   `state` **[string][34]** The state of the senator.
*   `gender` **[string][34]** The gender of the senator.
*   `rank` **[string][34]** The rank of the senator.
*   `osid` **[string][34]** The osid of the senator.

Returns **([Array][38]\<SenatorData> | \[])** An array of objects, each representing a senator with properties: name, party, state, gender, rank, and osid.

## filteredDataForTable

Returns **([Array][38]<[SenatorTableData][31]> | \[])**&#x20;

[1]: #createelement

[2]: #parameters

[3]: #createsignal

[4]: #parameters-1

[5]: #createeffect

[6]: #parameters-2

[7]: #createresource

[8]: #parameters-3

[9]: #meta

[10]: #properties

[11]: #extra

[12]: #properties-1

[13]: #person

[14]: #properties-2

[15]: #senator

[16]: #properties-3

[17]: #data

[18]: #properties-4

[19]: #fetcher

[20]: #parameters-4

[21]: #uniquearrayofparties

[22]: #uniquearrayofstates

[23]: #uniquearrayofranks

[24]: #numberofdemocraticsenators

[25]: #numberofrepublicansenators

[26]: #numberofindependentsenators

[27]: #partyleadership

[28]: #properties-5

[29]: #partyleadershipbyparty

[30]: #properties-6

[31]: #senatortabledata

[32]: #properties-7

[33]: #filtereddatafortable

[34]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[35]: https://developer.mozilla.org/docs/Web/HTML/Element

[36]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[37]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[38]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[39]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[40]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error

[41]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise