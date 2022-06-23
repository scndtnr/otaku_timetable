import { uniq } from "@/lib/uniq";
import { SpanType } from "./types";

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

export const colorDictByDataKey = (spanData: SpanType[], getKey: (data: SpanType) => string) => {
  const items = spanData.map(getKey);
  const entries = Object.entries(uniq(items));
  const colorLength = backgroundColor.length;
  return Object.assign(
    {},
    ...entries.map(([index, item]) => {
      const i: number = parseInt(index) % colorLength;
      return {
        [item]: {
          backgroundColor: backgroundColor[i],
          borderColor: borderColor[i],
        },
      };
    })
  );
};
