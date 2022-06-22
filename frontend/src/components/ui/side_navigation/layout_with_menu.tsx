import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import DrawerMenu from "./drawer_menu";
import Navigation from "./navigation";

const LayoutWithMenu = ({ children }: { children: ReactNode }) => {
  return (
    <Stack>
      <HStack p={5}>
        <Box display={{ base: "block", md: "none" }}>
          {" "}
          {/* for mobile */}
          <DrawerMenu />
          {/* Drawerを利用 */}
        </Box>
        <Heading>Menu</Heading>
      </HStack>
      <HStack alignItems="start">
        <Box display={{ base: "none", md: "block" }} w={300} px={6}>
          {" "}
          {/* for desktop */}
          <Navigation />
          {/* Navigationをそのまま利用 */}
        </Box>
        <Box>{children}</Box>
      </HStack>
    </Stack>
  );
};

export default LayoutWithMenu;
