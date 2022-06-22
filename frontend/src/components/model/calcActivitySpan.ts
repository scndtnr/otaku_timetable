import { UseFormWatch } from "react-hook-form";
import { ActivitySpanType, DailyTimeFormPartsType, DailyTimeFormType } from "./types";

// 項目間の時間を算出する
export const calcSpan = (watch: UseFormWatch<DailyTimeFormType>): ActivitySpanType[] => {
  const inputData = Object.entries<DailyTimeFormPartsType>(watch("schedule")).map(
    ([index, item]) => {
      return {
        index: parseInt(index),
        time: parseFloat(item.time),
        activity: item.activity,
        rawTime: item.time,
      };
    }
  );
  const max = inputData.length - 1;
  const firstPiece = {
    index: 0,
    span: inputData[0].time,
    activity: inputData[max].activity,
    rawTime: inputData[0].rawTime,
  };
  const spanData = inputData.map(({ index, time, activity, rawTime }) => {
    const span: number = index === max ? 24 - time : inputData[index + 1].time - time;
    return { index: index + 1, span, activity, rawTime };
  });
  spanData.unshift(firstPiece);
  return spanData;
};
