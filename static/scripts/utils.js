const PAGES = {
  SUPER: "Super Lotto",
  DD: "Double Draw",
  EXPRESS: "Express Cash",
  MEGA: "Mega 6",
};

let currentPage = "";

const getFormValues = () => {
  target = document.getElementById("target").value;
  limit = document.getElementById("limit").value;
  day = document.getElementById("day").value;
  month = document.getElementById("month").value;
  year = document.getElementById("year").value;

  console.log(target);
  return { target, limit, day, month, year };
};

const getFrequencies = (numberArrays) => {
  freqs = {};
  for (let i = 0; i < numberArrays.length; i++) {
    let results = numberArrays[i][0].split(", ");
    for (let res of results) {
      value = Number(res);
      if (!(value in freqs)) freqs[value] = 1;
      else freqs[value] += 1;
    }
  }
  return freqs;
};

const getMinMax = (limit, numberObj) => {
  if (numberObj == null)
    return {
      minNum: "No values were found matching this parameter",
      maxNum: "No values were found matching this parameter",
    };

  const compareFreqs = (a, b) => {
    return numberObj[b] - numberObj[a];
  };

  numberObj = Object.keys(numberObj).sort(compareFreqs);
  return { minNum: numberObj.slice(-limit), maxNum: numberObj.slice(0, limit) };
};

const updateFields = (values) => {
  minMaxAll = getMinMax(values.limit, getAllTimeFreq(values.target));
  document.getElementById("mfat").innerHTML = minMaxAll["maxNum"];
  document.getElementById("lfat").innerHTML = minMaxAll["minNum"];

  minMaxDay = getMinMax(values.limit, getDayFreq(values.target, values.day));
  document.getElementById("mcnd").innerHTML = minMaxDay["maxNum"];
  document.getElementById("lcnd").innerHTML = minMaxDay["minNum"];

  minMaxMonth = getMinMax(
    values.limit,
    getMonthFreq(values.target, values.month)
  );
  document.getElementById("mcnm").innerHTML = minMaxMonth["maxNum"];
  document.getElementById("lcnm").innerHTML = minMaxMonth["minNum"];

  minMaxYear = getMinMax(values.limit, getYearFreq(values.target, values.year));
  document.getElementById("mcny").innerHTML = minMaxYear["maxNum"];
  document.getElementById("lcny").innerHTML = minMaxYear["minNum"];
};
