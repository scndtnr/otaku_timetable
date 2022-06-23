import { groupBy } from "@/lib/groupby";
import { ActivitySpanType } from "./types";

export const sumActivitySpan = (spanData: ActivitySpanType[]) => {
  const groups = groupBy(spanData, (d) => d.activity);
  return Object.entries(groups).map(([activity, list]) => ({
    activity,
    total: list ? list.reduce((sum, row) => sum + row.span, 0) : 0,
  }));
};

export const sumCategorySpan = (spanData: ActivitySpanType[]) => {
  const groups = groupBy(spanData, (d) => d.category);
  return Object.entries(groups).map(([category, list]) => ({
    category,
    total: list ? list.reduce((sum, row) => sum + row.span, 0) : 0,
  }));
};
