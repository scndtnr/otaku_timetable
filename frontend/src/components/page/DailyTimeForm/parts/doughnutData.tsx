import { ActivitySpanType } from "../DailyTimeForm";

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
        [act]: { backgroundColor: backgroundColor[i], borderColor: borderColor[i] },
      };
    })
  );
};

const doughnutData = (spanData: ActivitySpanType[]) => {
  const labels = spanData.map((d) => d.activity);
  const data = spanData.map((d) => d.span);
  const colorDict = activityColorDict(spanData);
  return {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: data,
        backgroundColor: spanData.map((d) => colorDict[d.activity].backgroundColor),
        borderColor: spanData.map((d) => colorDict[d.activity].borderColor),
        borderWidth: 1,
      },
    ],
    options: {
      legend: {
        position: "right",
      },
    },
  };
};

export default doughnutData;
