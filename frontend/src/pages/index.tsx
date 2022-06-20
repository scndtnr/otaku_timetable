import type { NextPage } from "next";
import TopPage from "@/components/page/Top";
import styles from "@/styles/Home.module.css";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Box className={styles.container}>
      <TopPage />
    </Box>
  );
};

export default Home;
