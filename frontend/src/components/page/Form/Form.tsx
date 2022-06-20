import InputHours from "@/components/ui/input_hours";
import { Box, Button, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export const Form = () => {
  // 回答の状態管理
  type TimeTableAnswer = {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    q6: string;
  };

  const [answerState, setAnswerState] = useState<TimeTableAnswer>({
    q1: "0",
    q2: "0",
    q3: "0",
    q4: "0",
    q5: "0",
    q6: "0",
  });

  const labels = {
    q1: "オタ活",
    q2: "趣味（オタ活以外）",
    q3: "交友・交際",
    q4: "仕事",
    q5: "睡眠",
    q6: "その他",
  };

  const { control, handleSubmit, formState, getValues } = useForm<TimeTableAnswer>({
    defaultValues: answerState,
  });

  const maxHoursValidation = () =>
    sumValues(getValues()) <= 24 || "全項目の合計値が 24 h 以内に収まるよう入力してください。";

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

  // 円グラフの設定

  ChartJS.register(ArcElement, Tooltip, Legend);

  const doughnutData = (
    labelData: TimeTableAnswer,
    answerData: TimeTableAnswer,
    sumAnswer: number
  ) => {
    const labels = Object.values(labelData).concat(["未入力"]);
    const data = Object.values(answerData)
      .map((field) => field.replace(/\sh$/, ""))
      .map((hours) => parseFloat(hours))
      .concat([24 - sumAnswer]);
    return {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(192, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(192, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
      options: {
        legend: {
          position: "right",
        },
      },
    };
  };

  // 合計値の状態管理
  const [sumAnswerState, setSumAnswerState] = useState<number>(0);

  const sumValues = (obj: TimeTableAnswer) =>
    Object.values(obj)
      .map((field) => field.replace(/\sh$/, ""))
      .map((hours) => parseFloat(hours))
      .reduce((a, b) => a + b);

  useEffect(() => {
    setSumAnswerState(sumValues(answerState));
    console.log(`sum: ${sumAnswerState}`);
  }, [answerState]);

  return (
    <>
      <Stack marginLeft="2">
        <Box position="sticky" top="0" zIndex="sticky" backgroundColor="gray.200">
          <Box>Form Page</Box>
          <Box>Sum: {sumAnswerState}</Box>
          <Box>
            <Doughnut
              data={doughnutData(labels, answerState, sumAnswerState)}
              options={{
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </Box>
        </Box>

        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormControl>
                <FormLabel htmlFor="q1">{labels.q1}</FormLabel>
                <InputHours name="q1" control={control} rules={{ validate: maxHoursValidation }} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q2">{labels.q2}</FormLabel>
                <InputHours name="q2" control={control} rules={{ validate: maxHoursValidation }} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q3">{labels.q3}</FormLabel>
                <InputHours name="q3" control={control} rules={{ validate: maxHoursValidation }} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q4">{labels.q4}</FormLabel>
                <InputHours name="q4" control={control} rules={{ validate: maxHoursValidation }} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q5">{labels.q5}</FormLabel>
                <InputHours name="q5" control={control} rules={{ validate: maxHoursValidation }} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="q6">{labels.q6}</FormLabel>
                <InputHours name="q6" control={control} rules={{ validate: maxHoursValidation }} />
              </FormControl>
              {/* Submit */}
              <Box position="sticky" bottom="2" zIndex="sticky" backgroundColor="gray.200">
                <Button
                  margin={2}
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
