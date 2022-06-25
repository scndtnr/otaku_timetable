import { VStack } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { DailyTimeFormType } from "../../model/types";
import { ChartjsDoughnut } from "./parts/chartjsDoughnut";
import DailyTimeWithCategoryFormField from "@/components/model/dailyTimeWithCategoryFormField";
import { useRouter } from "next/router";
import { decodeScheduleFromQuery } from "@/components/model/shareButton";
import { useDidUpdateEffect } from "@/lib/use_did_update_effect";

export const DailyTimeForm = () => {
  const { query, isReady } = useRouter();

  const defalutSchedule = [
    {
      time: "0.0",
      activity: "睡眠",
      category: "生活",
    },
  ];
  const defalutPreInput = {
    time: "0.0",
    activity: "",
    category: "",
  };
  const defaultValues: DailyTimeFormType = {
    schedule: defalutSchedule,
    preInput: defalutPreInput,
  };
  const { control, register, getValues, watch, resetField } = useForm({ defaultValues });
  const { fields, append, remove, swap, replace } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "schedule", // unique name for your Field Array
  });

  useDidUpdateEffect(() => {
    if (typeof query.schedule === "string") {
      replace(decodeScheduleFromQuery(`${query.schedule}`));
    }
  }, [isReady]);

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
          replace={replace}
        />
      </VStack>
    </>
  );
};
