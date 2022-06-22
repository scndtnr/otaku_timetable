import { UseFormWatch } from "react-hook-form";
import { ActivitySpanType, DailyTimeFormPartsType, DailyTimeFormType } from "./types";

// 項目間の時間を算出する
export const calcSpan = (watch: UseFormWatch<DailyTimeFormType>): ActivitySpanType[] => {
  const inputData = Object.entries<DailyTimeFormPartsType>(watch("schedule")).map(
    ([index, item]) => {
      return { index: parseInt(index), time: parseFloat(item.time), activity: item.activity };
    }
  );
  const max = inputData.length - 1;
  const firstPiece = { index: 0, span: inputData[0].time, activity: inputData[max].activity };
  const spanData = inputData.map(({ index, time, activity }) => {
    const span: number = index === max ? 24 - time : inputData[index + 1].time - time;
    return { index: index + 1, span, activity };
  });
  spanData.unshift(firstPiece);
  return spanData;
};
