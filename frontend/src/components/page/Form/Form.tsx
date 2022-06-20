import InputHours from "@/components/ui/input_hours";
import { useDidUpdateEffect } from "@/lib/use_did_update_effect";
import { Box, Button, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const Form = () => {
  // 回答の状態管理
  type TimeTableAnswer = {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
  };

  const [answerState, setAnswerState] = useState<TimeTableAnswer>({
    q1: "0",
    q2: "0",
    q3: "0",
    q4: "0",
    q5: "0",
  });

  const { control, handleSubmit, formState } = useForm<TimeTableAnswer>({
    defaultValues: answerState,
  });

  const onSubmit: SubmitHandler<TimeTableAnswer> = (e) => {
    const parseFloatObject = (obj: TimeTableAnswer) => {
      const parsedEntries = Object.entries(obj).map(([key, value]) => [key, parseFloat(value)]);
      return Object.fromEntries(parsedEntries);
    };
    const parsedObject = parseFloatObject(e);

    console.log(e);
    console.log(parsedObject);
    setAnswerState(e);
  };

  // 合計値の状態管理
  const [sumAnswerState, setSumAnswerState] = useState<number>(0);

  useDidUpdateEffect(() => {
    const sumValues = (obj: TimeTableAnswer) =>
      Object.values(obj)
        .map((field) => field.replace(/\sh$/, ""))
        .map((hours) => parseFloat(hours))
        .reduce((a, b) => a + b);
    setSumAnswerState(sumValues(answerState));
    console.log(`sum: ${sumAnswerState}`);
  }, [answerState]);

  return (
    <>
      <Stack marginLeft="2">
        <Box position="sticky" top="0" zIndex="sticky" backgroundColor="gray.200">
          <Box>Form Page</Box>
          <Box>Sum: {sumAnswerState}</Box>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormControl>
                <FormLabel htmlFor="q1">q1</FormLabel>
                <InputHours name="q1" control={control} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q2">q2</FormLabel>
                <InputHours name="q2" control={control} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q3">q3</FormLabel>
                <InputHours name="q3" control={control} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q4">q4</FormLabel>
                <InputHours name="q4" control={control} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q5">q5</FormLabel>
                <InputHours name="q5" control={control} />
              </FormControl>
              {/* Submit */}
              <Box position="sticky" bottom="2" zIndex="sticky" backgroundColor="gray.200">
                <Button
                  mt={2}
                  colorScheme="orange"
                  isLoading={formState.isSubmitting}
                  type="submit"
                  w="fit-content"
                >
                  Submit
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>
    </>
  );
};
