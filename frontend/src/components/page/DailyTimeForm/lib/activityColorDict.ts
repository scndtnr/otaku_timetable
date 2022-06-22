import { uniq } from "@/lib/uniq";
import { ActivitySpanType } from "./types";

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

export const activityColorDict = (spanData: ActivitySpanType[]) => {
  const activities = spanData.map((d) => d.activity);
  const activiryEntries = Object.entries(uniq(activities));
  return Object.assign(
    {},
    ...activiryEntries.map(([index, act]) => {
      const i: number = parseInt(index) % 6;
      return {
        [act]: {
          backgroundColor: backgroundColor[i],
          borderColor: borderColor[i],
        },
      };
    })
  );
};
