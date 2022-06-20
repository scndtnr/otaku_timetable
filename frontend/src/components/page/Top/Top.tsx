import styles from "@/styles/Home.module.css";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export const Top = () => {
  return (
    <main className={styles.main}>
      <Heading className={styles.title}>
        ようこそ{" "}
        <Link href="/form">
          <Box
            as="span"
            cursor="pointer"
            color="blue.500"
            _hover={{
              textDecoration: "underline",
            }}
          >
            オタクの時間割
          </Box>
        </Link>
        へ！
      </Heading>
    </main>
  );
};
