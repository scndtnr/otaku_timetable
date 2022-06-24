import { groupBy } from "@/lib/groupby";
import { getCategoryOrActivity } from "./getKey";
import { SpanType } from "./types";

export const sumActivitySpan = (spanData: SpanType[]) => {
  const groups = groupBy(spanData, (d) => d.activity);
  return Object.entries(groups).map(([activity, list]) => ({
    activity,
    total: list ? list.reduce((sum, row) => sum + row.span, 0) : 0,
  }));
};

export const sumCategorySpan = (spanData: SpanType[]) => {
  const groups = groupBy(spanData, getCategoryOrActivity);
  return Object.entries(groups).map(([category, list]) => ({
    category,
    total: list ? list.reduce((sum, row) => sum + row.span, 0) : 0,
  }));
};
