let resultsJson;

fetch('static/results.json')
    .then(res => res.json())
    .then(json => {
        resultsJson = json;
    })
    .catch(err => console.error(err));


const getFrequencies = (jsonEntries) => {
    freqs = {};
    for (let i = 0; i < jsonEntries.length; i++) {
        let results = jsonEntries[i]['NUMBERS'].split("-");
        for (let res of results) {
            value = Number(res);
            if (!(value in freqs)) freqs[value] = 1;
            else freqs[value] += 1;
        }
    }
    return freqs;
};

const getAllTimeFreq = (tableName) => {
    const results = resultsJson[tableName];
    if (results == null) return null;
    return getFrequencies(results);
};

const getDayFreq = (tableName, day) => {
    const results = resultsJson[tableName];
    let finalResults = [];

    for (let result of results){
        let result_day = Number(result['DATE'].split("/")[1]);
        if (result_day == day) finalResults.push(result);
    }

    if (finalResults == null) return null;
    return getFrequencies(finalResults);
};

const getMonthFreq = (tableName, month) => {
    const results = resultsJson[tableName];
    let finalResults = [];

    for (let result of results){
        let result_month = Number(result['DATE'].split("/")[0]);
        if (result_month == month) finalResults.push(result);
    }

    if (finalResults == null) return null;
    return getFrequencies(finalResults);
};

const getYearFreq = (tableName, year) => {
    const results = resultsJson[tableName]
    let finalResults = [];

    for (let result of results){
        let result_year = Number(result['DATE'].split("/")[2]);
        if (result_year == year) finalResults.push(result);
    }

    if (finalResults == null) return null;
    return getFrequencies(finalResults);
};