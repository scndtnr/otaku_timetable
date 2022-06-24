import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { calcSpan } from "./calcSpan";
import { sumActivitySpan } from "./sumSpan";
import { DailyTimeFormFieldProps, DailyTimeFormPartsType } from "./types";
import { SelectTime } from "./selectForms";
import { handleSortFormElements } from "./sortFormElementsByTime";

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
  return (
    <Box padding={2}>
      {/* 実入力 */}
      {fields.map((item, index) => (
        <HStack key={`${item.id}-form-element`} backgroundColor="gray.50" paddingBottom={2}>
          <VStack key={`${item.id}-inputs`}>
            <HStack key={`${item.id}-line`}>
              <SelectTime
                key={`${item.id}-time`}
                name={`schedule.${index}.time`}
                control={control}
                placeholder="00:00"
                onBlur={handleSortFormElements(watch, swap)}
              />
              <Input
                key={`${item.id}-category-text`}
                placeholder="Input category"
                maxW="300"
                {...register(`schedule.${index}.category`)}
              />
            </HStack>
            <Input
              key={`${item.id}-activity-text`}
              placeholder="Input Activity"
              maxW="300"
              {...register(`schedule.${index}.activity`)}
            />
          </VStack>
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
        <VStack>
          <HStack>
            <SelectTime name={`preInput.time`} control={control} placeholder="00:00" />
            <Input placeholder="Input category" maxW="300" {...register(`preInput.category`)} />
          </HStack>
          <Input placeholder="Input Activity" maxW="300" {...register(`preInput.activity`)} />
        </VStack>
        <Button
          onClick={() => {
            const pre = getValues("preInput");
            append({ time: pre.time, activity: pre.activity, category: pre.category });
            handleSortFormElements(watch, swap)();
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

export default DailyTimeWithCategoryFormField;
