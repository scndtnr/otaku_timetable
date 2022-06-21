import Head from "next/head";
import HoursForm from "../HoursForm";
import { Top } from "./Top";

export const TopPage = () => {
  return (
    <>
      <Head>
        <title>オタクの時間割</title>
        <meta name="description" content="オタクの1日についてのアンケート＆類型化アプリ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Top /> */}
      <HoursForm />
    </>
  );
};
