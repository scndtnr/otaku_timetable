import { ChartData } from "chart.js";
import { activityColorDict } from "../../../model/activityColorDict";
import { clockValue, clockLabels } from "../../../model/clockData";
import { sumActivitySpan } from "../../../model/sumActivitySpan";
import { ActivitySpanType } from "../../../model/types";

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
          labelBorderColor: spanData.map((d) => colorDict[d.activity].borderColor),
          labelBackgroundColor: "white",
        },
      },
      {
        label: "Clock Hours",
        data: clockValue,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(192, 192, 192, 0.7)",
        borderWidth: 1,
        datalabels: {
          align: "center",
          labels: clockLabels,
          color: "gray",
          labelBorderColor: "rgba(0, 0, 0, 0)",
          labelBackgroundColor: "rgba(0, 0, 0, 0)",
        },
      },
    ],
  } as unknown as ChartData<"doughnut", number[], unknown>;
};

export default doughnutData;
