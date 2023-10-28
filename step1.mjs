// This function is used to fetch the data from whatever url is provided
//  the url can be relative or absolute
async function fetchData(url) {
    const response = await fetch(url);

    if (response.ok) {
        try {
            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
        }
    }
}

function getTotalSenators(senatorData) {
    const justParty = senatorData.objects.map((entry) => entry.party);
    const democrats = justParty.filter((party) => party === "Democrat").length;
    const republican = justParty.filter((party) => party === "Republican").length;
    const independent = justParty.filter((party) => party === "Independent").length;

    return {
        democrats,
        republican,
        independent,
    };
}

function leadershipRolls(senatorData) {
    const leadershipSenatorData = senatorData.objects
        .filter((senator) => senator.leadership_title !== null)
        .map((leadershipSenator) => ({
            party: leadershipSenator.party,
            role: leadershipSenator.leadership_title,
            name: `${leadershipSenator.person.firstname} ${leadershipSenator.person.lastname}`,
        }));

    const parties = leadershipSenatorData.reduce((finalObject, currentValue) => {
        finalObject[currentValue.party] = [];
        return finalObject;
    }, {});

    return leadershipSenatorData.reduce((finalObject, currentObject) => {
        finalObject[currentObject.party][currentObject.role] = currentObject.name;
        return finalObject;
    }, parties);
}

export { getTotalSenators, leadershipRolls, fetchData };
