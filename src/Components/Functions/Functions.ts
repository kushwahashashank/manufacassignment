import WineData from "../../Data/Wine-Data.json";

interface Winedata {
  Magnesium: number;
  Ash: number | string;
  Hue: number;
  Flavanoids: number | string;
}

function getfilterArray() {
  const filteredData: { [key: string]: Winedata[] } = {};
  // Filter data by alcohol ID
  WineData.forEach((entry: any) => {
    const alcoholID = entry.Alcohol;
    if (!filteredData[`Class ${alcoholID}`]) {
      filteredData[`Class ${alcoholID}`] = [];
    }
    filteredData[`Class ${alcoholID}`].push({
      Magnesium: entry.Magnesium,
      Ash: entry.Ash,
      Hue: entry.Hue,
      Flavanoids: entry.Flavanoids,
    });
  });

  return filteredData;
}

function calculateMeanMedianMode(arr: number[]): {
  meanrounded: number;
  medianrounded: number;
  moderounded: number;
} {
  // Mean Calculation
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  const mean = sum / arr.length;

  // Median Calculation
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedArr.length / 2);
  const median =
    sortedArr.length % 2 === 0
      ? (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2
      : sortedArr[middleIndex];

  // Mode Calculation
  const countMap = new Map<number, number>();
  arr.forEach((num) => {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  });
  let mode: number = 0;
  let maxCount = 0;
  countMap.forEach((count, num) => {
    if (count > maxCount) {
      mode = num;
      maxCount = count;
    }
  });
  let meanrounded: number = Math.round(mean * 1000) / 1000;
  let medianrounded: number = Math.round(median * 1000) / 1000;
  let moderounded: number = Math.round(mode * 1000) / 1000;
  return { meanrounded, medianrounded, moderounded };
}

function getcalculatedvalues() {
  let data = [
    ["Measure"],
    ["Flavonoids Mean"],
    ["Flavonoids Median"],
    ["Flavonoids Mode"],
  ];
  let gamma = [["Measure"], ["Gamma Mean"], ["Gamma Median"], ["Gamma Mode"]];
  const datafiltered = getfilterArray();
  Object.keys(datafiltered).forEach((key) => {
    const classdata = datafiltered[key];
    data[0].push(key);
    gamma[0].push(key);
    let Flavonoidsarray: number[] = [];
    let Gammaarray: number[] = [];
    classdata.map((value) => {
      Flavonoidsarray.push(convertfloat(value.Flavanoids));
      let hue = convertfloat(value.Hue);
      let ash = convertfloat(value.Ash);
      let magnisium = convertfloat(value.Magnesium);
      Gammaarray.push((hue * ash) / magnisium);
      return 0;
    });
    let Flavonoidvalues: {
      meanrounded: number;
      medianrounded: number;
      moderounded: number;
    } = calculateMeanMedianMode(Flavonoidsarray);
    let Gammavalues: {
      meanrounded: number;
      medianrounded: number;
      moderounded: number;
    } = calculateMeanMedianMode(Gammaarray);
    data[1].push(Flavonoidvalues.meanrounded.toString());
    data[2].push(Flavonoidvalues.medianrounded.toString());
    data[3].push(Flavonoidvalues.moderounded.toString());
    gamma[1].push(Gammavalues.meanrounded.toString());
    gamma[2].push(Gammavalues.medianrounded.toString());
    gamma[3].push(Gammavalues.moderounded.toString());
  });
  return [data, gamma];
}

function convertfloat(value: string | number) {
  if (typeof value === "string") {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return num;
    }
  } else if (typeof value === "number") {
    return value;
  }
  return 1;
}
export { getcalculatedvalues };
