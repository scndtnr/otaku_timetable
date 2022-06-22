import { ChartData, Color } from "chart.js";
import { sumActivitySpan } from "../lib/sumActivitySpan";
import { ActivitySpanType } from "../lib/types";

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(192, 192, 192, 0.2)",
];

const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(192, 192, 192, 1)",
];

const uniq = (array: Array<string>) => [...new Set(array)];

const activityColorDict = (spanData: ActivitySpanType[]) => {
  const activities = spanData.map((d) => d.activity);
  const activiryEntries = Object.entries(uniq(activities));
  return Object.assign(
    {},
    ...activiryEntries.map(([index, act]) => {
      const i: number = parseInt(index) % 6;
      return {
        [act]: {
          backgroundColor: backgroundColor[i] as Color,
          borderColor: borderColor[i] as Color,
        },
      };
    })
  );
};

export const generateLegendLabels = (spanData: ActivitySpanType[]) => {
  const activitySum = sumActivitySpan(spanData);
  activitySum.sort((a, b) => b.total - a.total);
  const colorDict = activityColorDict(spanData);
  return activitySum.map((item) => {
    return {
      text: `${item.activity}: ${item.total} h`,
      fillStyle: colorDict[item.activity].backgroundColor,
    };
  });
};

export const clockLabels = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

export const clockData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const doughnutData = (spanData: ActivitySpanType[]) => {
  const activityLabels = spanData.map((d) => d.activity);
  const activityData = spanData.map((d) => d.span);
  const colorDict = activityColorDict(spanData);
  return {
    datasets: [
      {
        label: "Daily Activity",
        data: activityData,
        backgroundColor: spanData.map((d) => colorDict[d.activity].backgroundColor),
        borderColor: spanData.map((d) => colorDict[d.activity].borderColor),
        borderWidth: 1,
        datalabels: {
          align: "end",
          labels: activityLabels,
          color: "black",
        },
      },
      {
        label: "Clock Hours",
        data: clockData,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(192, 192, 192, 0.7)",
        borderWidth: 1,
        datalabels: {
          align: "center",
          labels: clockLabels,
          color: "gray",
        },
      },
    ],
  } as unknown as ChartData<"doughnut", number[], unknown>;
};

export default doughnutData;
