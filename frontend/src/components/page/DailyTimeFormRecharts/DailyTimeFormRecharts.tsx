import { VStack } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { DailyTimeFormType } from "../../model/types";
import dynamic from "next/dynamic";
import DailyTimeFormField from "../../model/dailyTimeFormField";

const RechartsDoughnutWithoutSSR = dynamic(() => import("./parts/rechartsDoughnut"), {
  ssr: false,
});

export const DailyTimeFormRecharts = () => {
  const defaultValues: DailyTimeFormType = {
    schedule: [
      {
        time: "0.0",
        activity: "",
        category: "",
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
        <RechartsDoughnutWithoutSSR watch={watch} />

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
        />
      </VStack>
    </>
  );
};
