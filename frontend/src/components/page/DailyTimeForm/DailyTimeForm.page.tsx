import Head from "next/head";
import { DailyTimeForm } from "./DailyTimeForm";

export const DailyTimeFormPage = () => {
  return (
    <>
      <Head>
        <title>時刻ベース - 入力フォーム</title>
        <meta name="description" content="時刻ベースでのスケジュール入力フォーム" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DailyTimeForm />
    </>
  );
};
