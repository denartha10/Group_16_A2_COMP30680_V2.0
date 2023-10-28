function getMoreDetails(dataSource, osid) {
    return dataSource.objects
        .filter((entry) => entry.person.osid === osid)
        .map((entry) => ({
            office: entry.extra.office,
            dob: entry.person.birthday,
            startDate: entry.startdate,
            twitterId: entry.person?.twitterid ?? "Not Available/None",
            youtubeId: entry.person?.youtubeid ?? "Not available/None",
            websiteLink: entry.website,
        }))[0];
}

export { getMoreDetails };
