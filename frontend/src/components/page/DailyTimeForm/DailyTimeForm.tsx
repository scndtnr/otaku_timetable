import { VStack } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { DailyTimeFormType } from "../../model/types";
import DailyTimeFormField from "../../model/dailyTimeFormField";
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

  return (
    <>
      <VStack>
        <ChartjsDoughnut watch={watch} />

        <DailyTimeFormField
          fields={fields}
          control={control}
          register={register}
          getValues={getValues}
          watch={watch}
          append={append}
          remove={remove}
          swap={swap}
        />
      </VStack>
    </>
  );
};
