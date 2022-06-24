import { SpanType } from "./types";

export const getCategoryOrActivity = (data: SpanType): string =>
  data.category !== "" ? data.category : data.activity;
