import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/chakra_ui_theme";
import LayoutWithMenu from "@/components/ui/side_navigation/layout_with_menu";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LayoutWithMenu>
        <Component {...pageProps} />
      </LayoutWithMenu>
    </ChakraProvider>
  );
}

export default MyApp;
