import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import HoursFormPage from "@/components/page/HoursForm";

const hoursForm: NextPage = () => {
  return (
    <Box>
      <HoursFormPage />
    </Box>
  );
};

export default hoursForm;
