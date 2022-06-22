import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import DailyTableFormPage from "@/components/page/DailyTableForm";

const dailyTableForm: NextPage = () => {
  return (
    <Box>
      <DailyTableFormPage />
    </Box>
  );
};

export default dailyTableForm;
