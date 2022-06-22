import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { SelectTime } from "./parts/selectForms";
import { DailyTimeFormPartsType, DailyTimeFormType } from "./lib/types";
import { calcSpan } from "./lib/calcActivitySpan";
import { sumActivitySpan } from "./lib/sumActivitySpan";
import { ChartjsDoughnut } from "./parts/chartjsDoughnut";

export const DailyTimeForm = () => {
  const defaultValues: DailyTimeFormType = {
    schedule: [
      {
        time: "0.0",
        activity: "睡眠",
      },
      {
        time: "6.0",
        activity: "起床",
      },
    ],
  };
  const { control, register, getValues, watch } = useForm({ defaultValues });
  const { fields, append, remove, swap } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "schedule", // unique name for your Field Array
  });

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
    <>
      <VStack>
        <ChartjsDoughnut watch={watch} />

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
          <Button
            onClick={() => append({ time: "0.0", activity: "" })}
            backgroundColor="orange.100"
          >
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
      </VStack>
    </>
  );
};
