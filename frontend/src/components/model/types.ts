export type DailyTimeFormPartsType = {
  time: string;
  activity: string;
};

export type DailyTimeFormType = {
  schedule: DailyTimeFormPartsType[];
};

export type ActivitySpanType = {
  index: number;
  span: number;
  activity: string;
  rawTime: string;
};
