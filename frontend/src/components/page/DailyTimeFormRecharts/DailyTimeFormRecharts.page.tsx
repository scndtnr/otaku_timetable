import Head from "next/head";
import { DailyTimeFormRecharts } from "./DailyTimeFormRecharts";

export const DailyTimeFormRechartsPage = () => {
  return (
    <>
      <Head>
        <title>円グラフ - 時刻ベース</title>
        <meta name="description" content="時刻ベースでのスケジュール入力フォーム" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DailyTimeFormRecharts />
    </>
  );
};
