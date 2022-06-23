import { UseFormWatch } from "react-hook-form";
import { Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Text } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { colorDictByDataKey } from "@/components/model/ColorDict";
import { calcSpan } from "@/components/model/calcSpan";
import { clockDataObj } from "@/components/model/clockData";
import { sumActivitySpan } from "@/components/model/sumActivitySpan";
import { DailyTimeFormType } from "@/components/model/types";
import { Box, Stack } from "@chakra-ui/react";

const RechartsDoughnut = ({ watch }: { watch: UseFormWatch<DailyTimeFormType> }) => {
  // データ設定
  const spanData = calcSpan(watch).filter((d) => d.span !== 0);
  const clockData = clockDataObj; // 時計用データ
  const colorDict = colorDictByDataKey(spanData, (d) => d.activity); // ユニークな活動名毎の色

  // Lenged設定（活動毎のスパン合計を表示する）
  const activitySum = sumActivitySpan(spanData);
  activitySum.sort((a, b) => b.total - a.total);

  const legendPayload: Payload[] = activitySum.map((item) => ({
    value: `${item.activity}: ${item.total} h`,
    type: "square",
    id: item.activity,
    color: colorDict[item.activity].borderColor,
  }));

  // Label設定

  type rechartLabelType = {
    name: string;
    x: number;
    y: number;
    cx: number;
    cy: number;
    fill: string;
    innerRadius: number;
    outerRadius: number;
    midAngle: number;
  };

  const RADIAN = Math.PI / 180;

  const dataLabel2 = ({ name, cx, cy, midAngle, outerRadius, fill }: rechartLabelType) => {
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius - 10) * cos;
    const sy = cy + (outerRadius - 10) * sin;
    const mx = cx + (outerRadius + 10) * cos;
    const my = cy + (outerRadius + 10) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <>
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={colorDict[name].borderColor}
          strokeWidth="1"
          fill="none"
        />

        <text x={ex + (cos >= 0 ? 1 : -1) * 6} y={ey} textAnchor={textAnchor} fill="#333">
          {name}
        </text>
      </>
    );
  };

  const dataLabel = ({ name, x, cx, cy, innerRadius, outerRadius, midAngle }: rechartLabelType) => {
    const textAnchor = x > cx ? "start" : "end";
    const radius = innerRadius + (outerRadius - innerRadius) * 2;
    const calcX = cx + radius * Math.cos(-midAngle * RADIAN);
    const calcY = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <>
        {/* 引数で付属情報を受け取れます */}
        <Text x={calcX} y={calcY} textAnchor={textAnchor} fill={colorDict[name].borderColor}>
          {name}
        </Text>
      </>
    );
  };

  const clockLabel = ({ name, cx, cy, innerRadius, outerRadius, midAngle }: rechartLabelType) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <>
        {/* 引数で付属情報を受け取れます */}
        <Text x={x} y={y} textAnchor="middle" fill="gray" dominantBaseline="central" fontSize={12}>
          {name}
        </Text>
      </>
    );
  };

  return (
    <Box
    // backgroundColor="gray.100"
    >
      {/* <ResponsiveContainer> */}
      <PieChart width={350} height={380}>
        <Legend payload={legendPayload} />
        <Pie
          data={spanData}
          dataKey="span"
          nameKey="activity"
          startAngle={450}
          endAngle={90}
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={80}
          label={dataLabel2}
          labelLine={false}
          isAnimationActive={false}
        >
          {
            //円グラフの色を各領域ごとに分けるように指定
            spanData.map((d) => (
              <Cell
                key={`cell-${d.activity}-${d.index}`}
                fill={colorDict[d.activity].backgroundColor}
                stroke={colorDict[d.activity].borderColor}
                strokeWidth="2"
              />
            ))
          }
          {/* <LabelList
            dataKey="activity"
            position="outside"
            offset={16}
            fontSize={12}
            strokeWidth={0.5}
          /> */}
        </Pie>
        <Pie
          data={clockData}
          dataKey="value"
          nameKey="name"
          startAngle={450}
          endAngle={90}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={60}
          fill="rgba(0, 0, 0, 0)"
          stroke="rgba(192, 192, 192, 0.5)"
          isAnimationActive={false}
        >
          <LabelList
            dataKey="name"
            position="inside"
            fontSize={12}
            fontWeight="lighter"
            stroke="rgba(192, 192, 192, 1)"
          />
        </Pie>
      </PieChart>
      {/* </ResponsiveContainer> */}
    </Box>
  );
};

export default RechartsDoughnut;
