import styles from "@/styles/Home.module.css";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export const Top = () => {
  return (
    <main className={styles.main}>
      <Heading className={styles.title}>
        <Box as="span">1日の過ごし方を共有するアプリ</Box>
      </Heading>

      <Box as="ul" paddingTop={5}>
        <Box
          as="li"
          cursor="pointer"
          color="blue.500"
          _hover={{
            textDecoration: "underline",
          }}
        >
          <Link href="/dailyTimeForm">円グラフ(chart.js) ― 時刻ベース ※recharts版も実験中</Link>
        </Box>

        <Box
          as="li"
          cursor="pointer"
          color="blue.500"
          _hover={{
            textDecoration: "underline",
          }}
        >
          <Link href="/hoursForm">円グラフ(chart.js) ― 単位時間ベース</Link>
        </Box>
        <Box
          as="li"
          cursor="pointer"
          color="blue.500"
          _hover={{
            textDecoration: "underline",
          }}
        >
          <Link href="/dailyTableForm">累積あるいはテーブル ― 時刻ベース</Link>
        </Box>
      </Box>
    </main>
  );
};
