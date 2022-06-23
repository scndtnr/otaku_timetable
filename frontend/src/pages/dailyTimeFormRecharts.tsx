import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import DailyTimeFormRechartsPage from "@/components/page/DailyTimeFormRecharts";

const dailyTimeForm: NextPage = () => {
  return (
    <Box>
      <DailyTimeFormRechartsPage />
    </Box>
  );
};

export default dailyTimeForm;
