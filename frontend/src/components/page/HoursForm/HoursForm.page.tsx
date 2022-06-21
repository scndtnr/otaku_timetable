import Head from "next/head";
import { HoursForm } from "./HoursForm";

export const HoursFormPage = () => {
  return (
    <>
      <Head>
        <title>入力フォーム - オタクの時間割</title>
        <meta name="description" content="オタクの時間割の入力フォーム" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HoursForm />
    </>
  );
};
