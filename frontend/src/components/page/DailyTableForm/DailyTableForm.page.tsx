import Head from "next/head";
import { DailyTableForm } from "./DailyTableForm";

export const DailyTableFormPage = () => {
  return (
    <>
      <Head>
        <title>累積あるいはテーブル - 時刻ベース</title>
        <meta name="description" content="時刻ベースでのスケジュール入力フォーム" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DailyTableForm />
    </>
  );
};
