import Navigation from "@/components/ui/side_navigation/navigation";
import styles from "@/styles/Home.module.css";
import { Box, Heading, Text } from "@chakra-ui/react";

export const Top = () => {
  return (
    <main className={styles.main}>
      <Heading className={styles.title}>
        <Box as="span">1日の過ごし方を共有するアプリ</Box>
      </Heading>

      <Navigation />
    </main>
  );
};
