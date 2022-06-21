import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import DailyTimeFormPage from "@/components/page/DailyTimeForm";

const dailyTimeForm: NextPage = () => {
  return (
    <Box>
      <DailyTimeFormPage />
    </Box>
  );
};

export default dailyTimeForm;
