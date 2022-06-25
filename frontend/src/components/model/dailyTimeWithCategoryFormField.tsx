import { Box, Button, HStack, Input, Spacer, Stack, VStack } from "@chakra-ui/react";
import { calcSpan } from "./calcSpan";
import { sumActivitySpan } from "./sumSpan";
import { DailyTimeFormFieldProps } from "./types";
import { SelectTime } from "./selectForms";
import { handleSortFormElements } from "./sortFormElementsByTime";
import { SocialShareButtons, UrlButton } from "./shareButton";
import { timeGroups } from "./selectGroups";

const DailyTimeWithCategoryFormField = ({
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
  const calcNextTimeIndex = (index: number) => {
    const maxIndex = fields.length - 1;
    return index === maxIndex ? 0 : index + 1;
  };
  const getTimeLabel = (timeValue: string): string | undefined =>
    timeGroups.find((time) => time.value === timeValue)?.label;

  const calcEndTimeLabel = (index: number) => {
    const endTimeValueIndex = calcNextTimeIndex(index);
    return getTimeLabel(getValues(`schedule.${endTimeValueIndex}.time`));
  };
  const calcTimeRangeSpan = (index: number) => {
    const endTimeValueIndex = calcNextTimeIndex(index);
    const start = getValues(`schedule.${index}.time`);
    const end = getValues(`schedule.${endTimeValueIndex}.time`);
    return endTimeValueIndex !== 0
      ? parseFloat(end) - parseFloat(start)
      : parseFloat(end) + 24.0 - parseFloat(start);
  };

  return (
    <Stack>
      {/* 実入力 */}
      {fields.map((item, index) => (
        <HStack key={`${item.id}-form-element`} backgroundColor="gray.50" padding={2}>
          <VStack key={`${item.id}-inputs`} align="start">
            <HStack key={`${item.id}-input-time`}>
              <SelectTime
                key={`${item.id}-time`}
                name={`schedule.${index}.time`}
                control={control}
                placeholder="00:00"
                onBlur={handleSortFormElements(watch, swap)}
              />
              <Box as="span" whiteSpace="nowrap" key={`${item.id}-endtime`}>
                ～　{calcEndTimeLabel(index)}　({calcTimeRangeSpan(index)} h)
              </Box>
            </HStack>
            <HStack key={`${item.id}-input-text`}>
              <Input
                key={`${item.id}-category-text`}
                placeholder="Category"
                maxW="100px"
                {...register(`schedule.${index}.category`)}
              />
              <Box as="span">：</Box>
              <Input
                key={`${item.id}-activity-text`}
                placeholder="Activity"
                {...register(`schedule.${index}.activity`)}
              />
            </HStack>
          </VStack>
          {index !== 0 ? (
            <Button
              key={`${item.id}-remove`}
              onClick={() => remove(index)}
              backgroundColor="blue.100"
            >
              -
            </Button>
          ) : (
            <Button key={`${item.id}-remove-disable`}>-</Button>
          )}
        </HStack>
      ))}

      {/* 仮入力 */}
      <HStack backgroundColor="orange.50" padding={2}>
        <VStack align="start">
          <SelectTime name={`preInput.time`} control={control} placeholder="00:00" />
          <HStack>
            <Input placeholder="Category" maxW="100px" {...register(`preInput.category`)} />
            <Box as="span">：</Box>
            <Input placeholder="Activity" maxW="300" {...register(`preInput.activity`)} />
          </HStack>
        </VStack>
        <Button
          onClick={() => {
            const pre = getValues("preInput");
            append(
              { time: pre.time, activity: pre.activity, category: pre.category },
              { shouldFocus: false }
            );
            handleSortFormElements(watch, swap)();
            resetField("preInput");
          }}
          backgroundColor="orange.100"
        >
          +
        </Button>
      </HStack>
      <Spacer />
      {/* <SocialShareButtons watch={watch} /> */}
      <UrlButton watch={watch} />
      <Spacer />
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
    </Stack>
  );
};

export default DailyTimeWithCategoryFormField;
