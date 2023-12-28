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
  min = null;
  max = 0;
  min_num = 0;
  max_num = 0;

  for (let num of Object.keys(numberObj)) {
    if (numberObj[num] > max) {
      max = numberObj[num];
      max_num = num;
    }
    if (min == null || numberObj[num] < min) {
      min = numberObj[num];
      min_num = num;
    }
  }

  return { min_num, max_num };
};

const updateFields = (values) => {
  min_max_all = getMinMax(getAllTimeFreq("SUPER", 10));
  console.log(min_max_all);
  document.getElementById("mfat").innerHTML = min_max_all["max_num"];
  document.getElementById("lfat").innerHTML = min_max_all["min_num"];
};
