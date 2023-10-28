/**
 * @typedef {Object} Meta
 * @property {number} limit - The limit of the data
 * @property {number} offset - The offset of the data
 * @property {number} total_count - The total count of the data
 */

/**
 * @typedef {Object} Extra
 * @property {string} address - The address of the senator
 * @property {string} contact_form - The contact form URL
 * @property {string} fax - The fax number
 * @property {string} office - The office of the senator
 * @property {string} [rss_url] - The RSS URL of the senator
 */

/**
 * @typedef {Object} Person
 * @property {string} bioguideid - The bioguide ID of the senator
 * @property {string} birthday - The birthday of the senator
 * @property {number} cspanid - The C-SPAN ID of the senator
 * @property {string} firstname - The first name of the senator
 * @property {string} gender - The gender of the senator
 * @property {string} gender_label - The gender label of the senator
 * @property {string} lastname - The last name of the senator
 * @property {string} link - The link to the senator's profile
 * @property {string} middlename - The middle name of the senator
 * @property {string} name - The name of the senator
 * @property {string} namemod - The name modifier of the senator
 * @property {string} nickname - The nickname of the senator
 * @property {string} osid - The OS ID of the senator
 * @property {string} pvsid - The PVS ID of the senator
 * @property {string} sortname - The sort name of the senator
 * @property {string} twitterid - The Twitter ID of the senator
 * @property {string} youtubeid - The YouTube ID of the senator
 */

/**
 * @typedef {Object} Senator
 * @property {?string} caucus - The caucus of the senator
 * @property {number[]} congress_numbers - The congress numbers of the senator
 * @property {boolean} current - Whether the senator is current
 * @property {string} description - The description of the senator
 * @property {?string} district - The district of the senator
 * @property {string} enddate - The end date of the senator's role
 * @property {Extra} extra - The extra information of the senator
 * @property {?string} leadership_title - The leadership title of the senator
 * @property {string} party - The party of the senator
 * @property {Person} person - The person information of the senator
 * @property {string} phone - The phone number of the senator
 * @property {string} role_type - The role type of the senator
 * @property {string} role_type_label - The role type label of the senator
 * @property {string} senator_class - The senator class of the senator
 * @property {string} senator_class_label - The senator class label of the senator
 * @property {string} senator_rank - The senator rank of the senator
 * @property {string} senator_rank_label - The senator rank label of the senator
 * @property {string} startdate - The start date of the senator's role
 * @property {string} state - The state of the senator
 * @property {string} title - The title of the senator
 * @property {string} title_long - The long title of the senator
 * @property {string} website - The website of the senator
 */

/**
 * @typedef {Object} Data
 * @property {Meta} meta - The metadata of the data
 * @property {Senator[]} objects - The objects in the data
 */

export const Types = {}