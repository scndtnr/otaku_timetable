import { UseFieldArraySwap, UseFormWatch } from "react-hook-form";
import { DailyTimeFormPartsType, DailyTimeFormType } from "./types";

// time項目からフォーカスが外れた時にソートする
export const handleSortFormElements =
  (watch: UseFormWatch<DailyTimeFormType>, swap: UseFieldArraySwap) => () => {
    // console.log("--- OnBlur Start ---");

    // 参照用の配列を作成する
    const timeList = Object.values<DailyTimeFormPartsType>(watch("schedule")).map((item) =>
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
