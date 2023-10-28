function filterByParty(objectToFilter, party) {
    return party === 'all' ? objectToFilter : objectToFilter.filter((entry) => entry.party === party);
}

function filterByState(objectToFilter, state) {
    return state === 'all' ? objectToFilter : objectToFilter.filter((entry) => entry.state === state);
}

function filterByRank(objectToFilter, rank) {
    return rank === 'all' ? objectToFilter : objectToFilter.filter((entry) => entry.rank === rank);
}


export {
    filterByParty,
    filterByState,
    filterByRank
}