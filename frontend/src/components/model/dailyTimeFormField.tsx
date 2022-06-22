import { Box, Button, HStack, Input } from "@chakra-ui/react";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArraySwap,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { calcSpan } from "./calcActivitySpan";
import { sumActivitySpan } from "./sumActivitySpan";
import { DailyTimeFormPartsType, DailyTimeFormType } from "./types";
import { SelectTime } from "./selectForms";

type DailyTimeFormFieldProps = {
  fields: FieldArrayWithId<DailyTimeFormType, "schedule", "id">[];
  control: Control<DailyTimeFormType, any>;
  register: UseFormRegister<DailyTimeFormType>;
  getValues: UseFormGetValues<DailyTimeFormType>;
  watch: UseFormWatch<DailyTimeFormType>;
  append: UseFieldArrayAppend<DailyTimeFormType, "schedule">;
  remove: UseFieldArrayRemove;
  swap: UseFieldArraySwap;
};

const DailyTimeFormField = ({
  fields,
  control,
  register,
  getValues,
  watch,
  append,
  remove,
  swap,
}: DailyTimeFormFieldProps) => {
  // time項目からフォーカスが外れた時にソートする
  const onBlurSortFormElements = () => {
    // console.log("--- OnBlur Start ---");

    // 参照用の配列を作成する
    const timeList = Object.values<DailyTimeFormPartsType>(watch("schedule")).map((item) =>
      parseFloat(item.time)
    );

    // バブルソート
    for (let i = 0; i < timeList.length; i++) {
      for (let j = timeList.length - 1; i < j; j--) {
        if (timeList[j] < timeList[j - 1]) {
          // console.log(`OnBlur swap: ${j}, ${j - 1}`);
          // フォームのスワップ
          swap(j, j - 1);
          // 参照用配列のスワップ
          [timeList[j], timeList[j - 1]] = [timeList[j - 1], timeList[j]];
        }
      }
    }
    // console.log("--- OnBlur End ---");
  };

  return (
    <Box padding={2}>
      {fields.map((item, index) => (
        <HStack key={item.id}>
          <SelectTime
            key={`${item.id}-time`}
            name={`schedule.${index}.time`}
            control={control}
            placeholder="00:00"
            onBlur={onBlurSortFormElements}
          />
          <Input
            key={`${item.id}-activity-text`}
            placeholder="Input Activity"
            maxW="300"
            {...register(`schedule.${index}.activity`)}
          />
          <Button
            key={`${item.id}-remove`}
            onClick={() => remove(index)}
            backgroundColor="blue.100"
          >
            -
          </Button>
        </HStack>
      ))}
      <Button onClick={() => append({ time: "0.0", activity: "" })} backgroundColor="orange.100">
        +
      </Button>
      <Button
        onClick={() => {
          console.log(JSON.stringify(getValues()));
          console.log(JSON.stringify(calcSpan(watch)));
          console.log(JSON.stringify(sumActivitySpan(calcSpan(watch))));
        }}
        backgroundColor="green.100"
      >
        Log
      </Button>
    </Box>
  );
};

export default DailyTimeFormField;
