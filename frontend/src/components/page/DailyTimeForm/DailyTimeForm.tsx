import { VStack } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { DailyTimeFormType } from "../../model/types";
import { ChartjsDoughnut } from "./parts/chartjsDoughnut";
import DailyTimeWithCategoryFormField from "@/components/model/dailyTimeWithCategoryFormField";

export const DailyTimeForm = () => {
  const defaultValues: DailyTimeFormType = {
    schedule: [
      {
        time: "0.0",
        activity: "睡眠",
        category: "生活",
      },
    ],
    preInput: {
      time: "0.0",
      activity: "",
      category: "",
    },
  };
  const { control, register, getValues, watch, resetField } = useForm({ defaultValues });
  const { fields, append, remove, swap } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "schedule", // unique name for your Field Array
  });

  return (
    <>
      <VStack>
        <ChartjsDoughnut watch={watch} />

        <DailyTimeWithCategoryFormField
          fields={fields}
          control={control}
          register={register}
          getValues={getValues}
          resetField={resetField}
          watch={watch}
          append={append}
          remove={remove}
          swap={swap}
        />
      </VStack>
    </>
  );
};
