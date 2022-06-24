import { ChartData } from "chart.js";
import { colorDictByDataKey } from "../../../model/ColorDict";
import { clockValue, clockLabels } from "../../../model/clockData";
import { sumActivitySpan, sumCategorySpan } from "../../../model/sumSpan";
import { SpanType } from "../../../model/types";
import { getCategoryOrActivity } from "@/components/model/getKey";

export const activitySumLegendLabels = (spanData: SpanType[]) => {
  const activitySum = sumActivitySpan(spanData);
  activitySum.sort((a, b) => b.total - a.total);
  const colorDict = colorDictByDataKey(spanData, (d) => d.activity);
  return activitySum.map((item) => {
    return {
      text: `${item.activity}: ${item.total} h`,
      fillStyle: colorDict[item.activity].backgroundColor,
    };
  });
};

export const categorySumLegendLabels = (spanData: SpanType[]) => {
  const categorySum = sumCategorySpan(spanData);
  categorySum.sort((a, b) => b.total - a.total);
  const colorDict = colorDictByDataKey(spanData, getCategoryOrActivity);
  return categorySum.map((item) => {
    return {
      text: `${item.category}: ${item.total} h`,
      fillStyle: colorDict[item.category].backgroundColor,
    };
  });
};

const wordsWrap = (words: string[], lineLength: number) => {
  return words.map((word) => {
    const regex = new RegExp(`.{1,${lineLength}}`, "g");
    return word.match(regex)?.join("\n");
  });
};

const doughnutData = (spanData: SpanType[]) => {
  const activityLabels = spanData.map((d) => d.activity);
  const activityData = spanData.map((d) => d.span);
  const activityColorDict = colorDictByDataKey(spanData, (d) => d.activity);
  const categoryColorDict = colorDictByDataKey(spanData, getCategoryOrActivity);

  // データセットの準備
  const activityDataset = {
    label: "Daily Activity",
    data: activityData,
    backgroundColor: spanData.map((d) => activityColorDict[d.activity].backgroundColor),
    borderColor: spanData.map((d) => activityColorDict[d.activity].borderColor),
    borderWidth: 1,
    datalabels: {
      // display: true,
      align: "end",
      labels: activityLabels,
      labelLength: activityLabels.length,
      color: "black",
      labelBorderColor: spanData.map((d) => activityColorDict[d.activity].borderColor),
      labelBackgroundColor: "white",
    },
  };
  const activityWithCategoryDataset = {
    label: "Daily Activity with Category",
    data: activityData,
    backgroundColor: spanData.map(
      (d) => categoryColorDict[getCategoryOrActivity(d)].backgroundColor
    ),
    borderColor: spanData.map((d) => categoryColorDict[getCategoryOrActivity(d)].borderColor),
    borderWidth: 1,
    datalabels: {
      // display: false,
      align: "end",
      font: {
        size: 10,
      },
      labels: wordsWrap(activityLabels, 5),
      labelLength: activityLabels.length,
      color: "black",
      labelBorderColor: spanData.map(
        (d) => categoryColorDict[getCategoryOrActivity(d)].borderColor
      ),
      labelBackgroundColor: "white",
    },
  };
  const clockDataset = {
    label: "Clock Hours",
    data: clockValue,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderColor: "rgba(192, 192, 192, 0.7)",
    borderWidth: 1,
    datalabels: {
      // display: true,
      align: "center",
      labels: clockLabels,
      color: "gray",
      labelBorderColor: "rgba(0, 0, 0, 0)",
      labelBackgroundColor: "rgba(0, 0, 0, 0)",
    },
  };

  return {
    datasets: [activityWithCategoryDataset, clockDataset],
  } as unknown as ChartData<"doughnut", number[], unknown>;
};

export default doughnutData;
