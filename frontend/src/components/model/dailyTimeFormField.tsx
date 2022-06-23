import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { calcSpan } from "./calcSpan";
import { sumActivitySpan } from "./sumSpan";
import { DailyTimeFormFieldProps, DailyTimeFormPartsType } from "./types";
import { SelectTime } from "./selectForms";

const DailyTimeFormField = ({
  fields,
  control,
  register,
  getValues,
  resetField,
  watch,
  append,
  remove,
  swap,
}: DailyTimeFormFieldProps) => {
  // time項目からフォーカスが外れた時にソートする
  const handleSortFormElements = () => {
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
      {/* 実入力 */}
      {fields.map((item, index) => (
        <HStack key={item.id} backgroundColor="gray.50">
          <SelectTime
            key={`${item.id}-time`}
            name={`schedule.${index}.time`}
            control={control}
            placeholder="00:00"
            onBlur={handleSortFormElements}
          />
          <Input
            key={`${item.id}-activity-text`}
            placeholder="Input Activity"
            maxW="300"
            {...register(`schedule.${index}.activity`)}
          />
          {index !== 0 && (
            <Button
              key={`${item.id}-remove`}
              onClick={() => remove(index)}
              backgroundColor="blue.100"
            >
              -
            </Button>
          )}
        </HStack>
      ))}
      {/* 仮入力 */}
      <HStack backgroundColor="orange.50">
        <SelectTime
          name={`preInput.time`}
          control={control}
          placeholder="00:00"
          onBlur={handleSortFormElements}
        />
        <Input placeholder="Input Activity" maxW="300" {...register(`preInput.activity`)} />
        <Button
          onClick={() => {
            const pre = getValues("preInput");
            append({ time: pre.time, activity: pre.activity, category: "" });
            handleSortFormElements();
            resetField("preInput");
          }}
          backgroundColor="orange.100"
        >
          +
        </Button>
      </HStack>

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
