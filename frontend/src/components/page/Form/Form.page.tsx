import Head from "next/head";
import { Form } from "./Form";

export const FormPage = () => {
  return (
    <>
      <Head>
        <title>入力フォーム - オタクの時間割</title>
        <meta name="description" content="オタクの時間割の入力フォーム" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form />
    </>
  );
};
