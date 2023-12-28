const PAGES = {
  SUPER: "Super Lotto",
  DD: "Double Draw",
  EXPRESS: "Express Cash",
  MEGA: "Mega 6",
};

let currentPage = "";

const getFormValues = () => {
  target = document.getElementById("target").innerHTML;
  day = document.getElementById("day").value;
  month = document.getElementById("month").value;
  year = document.getElementById("year").value;

  return [target, day, month, year];
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

const getMinMax = (numberObj) => {
  if (numberObj == null)
    return {
      minNum: "No values were found matching this parameter",
      maxNum: "No values were found matching this parameter",
    };

  min = null;
  max = 0;
  minNum = 0;
  maxNum = 0;

  for (let num of Object.keys(numberObj)) {
    if (numberObj[num] > max) {
      max = numberObj[num];
      maxNum = num;
    }
    if (min == null || numberObj[num] < min) {
      min = numberObj[num];
      minNum = num;
    }
  }

  return { minNum, maxNum };
};

const updateFields = (values) => {
  minMaxAll = getMinMax(getAllTimeFreq("SUPER"));
  document.getElementById("mfat").innerHTML = minMaxAll["maxNum"];
  document.getElementById("lfat").innerHTML = minMaxAll["minNum"];

  minMaxDay = getMinMax(getDayFreq("SUPER", 5));
  document.getElementById("mcnd").innerHTML = minMaxDay["maxNum"];
  document.getElementById("lcnd").innerHTML = minMaxDay["minNum"];

  minMaxMonth = getMinMax(getMonthFreq("SUPER", 6));
  document.getElementById("mcnm").innerHTML = minMaxMonth["maxNum"];
  document.getElementById("lcnm").innerHTML = minMaxMonth["minNum"];

  minMaxYear = getMinMax(getYearFreq("SUPER", 2015));
  document.getElementById("mcny").innerHTML = minMaxYear["maxNum"];
  document.getElementById("lcny").innerHTML = minMaxYear["minNum"];
};
