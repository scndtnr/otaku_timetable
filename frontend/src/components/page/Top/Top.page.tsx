import Head from "next/head";
import { Top } from "./Top";

export const TopPage = () => {
  return (
    <>
      <Head>
        <title>1日のスケジュール可視化</title>
        <meta name="description" content="1日の過ごし方を共有して趣味の時間を捻出したい" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Top />
    </>
  );
};
