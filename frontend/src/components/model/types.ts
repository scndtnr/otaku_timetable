import {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArraySwap,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";

export type DailyTimeFormFieldProps = {
  fields: FieldArrayWithId<DailyTimeFormType, "schedule", "id">[];
  control: Control<DailyTimeFormType, any>;
  register: UseFormRegister<DailyTimeFormType>;
  getValues: UseFormGetValues<DailyTimeFormType>;
  resetField: UseFormResetField<DailyTimeFormType>;
  watch: UseFormWatch<DailyTimeFormType>;
  append: UseFieldArrayAppend<DailyTimeFormType, "schedule">;
  remove: UseFieldArrayRemove;
  swap: UseFieldArraySwap;
};

export type DailyTimeFormPartsType = {
  time: string;
  activity: string;
  category: string;
};

export type DailyTimeWithCategoryFormPartsType = {
  time: string;
  activity: string;
  category: string;
};

export type DailyTimeFormType = {
  schedule: DailyTimeFormPartsType[];
  preInput: DailyTimeFormPartsType;
};

export type ActivitySpanType = {
  index: number;
  span: number;
  activity: string;
  category: string;
  rawTime: string;
};
