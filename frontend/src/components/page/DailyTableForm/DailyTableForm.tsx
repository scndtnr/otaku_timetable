import { VStack } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { DailyTimeFormType } from "@/components/model/types";
import ActivityTable from "./parts/activityTable";
import DailyTimeFormField from "@/components/model/dailyTimeFormField";

export const DailyTableForm = () => {
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
  const { fields, append, remove, swap, replace } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "schedule", // unique name for your Field Array
  });

  return (
    <>
      <VStack>
        <DailyTimeFormField
          fields={fields}
          control={control}
          register={register}
          getValues={getValues}
          resetField={resetField}
          watch={watch}
          append={append}
          remove={remove}
          swap={swap}
          replace={replace}
        />
        <ActivityTable watch={watch} />
      </VStack>
    </>
  );
};
