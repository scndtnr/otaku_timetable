import { Link, LinkProps, Stack } from "@chakra-ui/react";

const HoverLink = (props: LinkProps) => (
  <Link rounded="base" _hover={{ bg: "gray.200" }} p={2} {...props} />
);

const Navigation = () => {
  return (
    <Stack as="nav">
      <HoverLink href="/">Home</HoverLink>
      <HoverLink href="/dailyTimeFormRecharts">円グラフ(Recharts) ― 時刻ベース ※実験中</HoverLink>
      <HoverLink href="/dailyTimeForm">円グラフ(chart.js) ― 時刻ベース</HoverLink>
      <HoverLink href="/hoursForm">円グラフ(chart.js) ― 単位時間ベース</HoverLink>
      <HoverLink href="/dailyTableForm">累積あるいはテーブル ― 時刻ベース</HoverLink>
    </Stack>
  );
};

export default Navigation;
