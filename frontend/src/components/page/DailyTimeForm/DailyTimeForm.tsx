import { Box, Button, Container, HStack, Input, Stack } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { SelectTime } from "./parts/selectForms";
import { Chart as ChartJS, ArcElement, Color } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import doughnutData from "./parts/doughnutData";
import ChartDataLabels from "chartjs-plugin-datalabels";

export type DailyTimeFormType = {
  time: string;
  activity: string;
};

export type ActivitySpanType = {
  index: number;
  span: number;
  activity: string;
};

export const DailyTimeForm = () => {
  const defaultValues = {
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

  // 項目間の時間を算出する
  const calcSpan = (): ActivitySpanType[] => {
    const inputData = Object.entries<DailyTimeFormType>(watch("schedule")).map(([index, item]) => {
      return { index: parseInt(index), time: parseFloat(item.time), activity: item.activity };
    });
    const max = inputData.length - 1;
    const firstPiece = { index: 0, span: inputData[0].time, activity: inputData[max].activity };
    const spanData = inputData.map(({ index, time, activity }) => {
      const span: number = index === max ? 24 - time : inputData[index + 1].time - time;
      return { index: index + 1, span, activity };
    });
    spanData.unshift(firstPiece);
    return spanData;
  };

  // time項目からフォーカスが外れた時にソートする
  const onBlurSortFormElements = () => {
    // console.log("--- OnBlur Start ---");

    // 参照用の配列を作成する
    const timeList = Object.values<DailyTimeFormType>(watch("schedule")).map((item) =>
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

  // 円グラフの設定
  ChartJS.register(ArcElement, ChartDataLabels);

  return (
    <>
      <Stack>
        <Box>DailyTimeForm</Box>
        <Container className="chart-container" position="relative" h="300">
          <Doughnut
            data={doughnutData(calcSpan())}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: 30,
              },
              plugins: {
                datalabels: {
                  font: {
                    family: "monospace",
                  },
                  display: (ctx) => ctx.dataset.data[ctx.dataIndex] !== 0,
                  align: (ctx) => ctx.dataset.datalabels?.align as "center" | "end",
                  offset: 20,
                  formatter: (value, ctx) => {
                    const labels = ctx.dataset.datalabels?.labels;
                    return labels ? labels[ctx.dataIndex] : "undefined";
                  },
                  color: (ctx) => ctx.dataset.datalabels?.color as Color,
                },
              },
            }}
          />
        </Container>

        <Box padding={2}>
          {fields.map((item, index) => (
            <HStack key={item.id}>
              <SelectTime
                key={`${item.id}-time`}
                name={`schedule.${index}.time`}
                control={control}
                placeholder="00:00"
                onBlur={onBlurSortFormElements}
              />
              <Input
                key={`${item.id}-activity-text`}
                placeholder="Input Activity"
                maxW="300"
                {...register(`schedule.${index}.activity`)}
              />
              <Button
                key={`${item.id}-remove`}
                onClick={() => remove(index)}
                backgroundColor="blue.100"
              >
                -
              </Button>
            </HStack>
          ))}
          <Button
            onClick={() => append({ time: "0.0", activity: "" })}
            backgroundColor="orange.100"
          >
            +
          </Button>
          <Button
            onClick={() => {
              console.log(JSON.stringify(getValues()));
              console.log(JSON.stringify(calcSpan()));
            }}
            backgroundColor="green.100"
          >
            Log
          </Button>
        </Box>
      </Stack>
    </>
  );
};
