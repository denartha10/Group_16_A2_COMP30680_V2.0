function senatorWebpageData(senatorData) {
    return senatorData.objects.map((entry) => ({
        name: `${entry.person.firstname} ${entry.person.lastname}`,
        party: entry.party,
        state: entry.state,
        gender: entry.person.gender,
        rank: entry.senator_rank_label,
        osid: entry.person.osid,
    }));
}

export { senatorWebpageData };
