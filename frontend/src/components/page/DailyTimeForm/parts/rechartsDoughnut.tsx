import { Box } from "@chakra-ui/react";
import { UseFormWatch } from "react-hook-form";
import { Pie, PieChart, ResponsiveContainer, Text } from "recharts";
import { calcSpan } from "../../../model/calcActivitySpan";
import { clockDataObj } from "../../../model/clockData";
import { sumActivitySpan } from "../../../model/sumActivitySpan";
import { DailyTimeFormType } from "../../../model/types";

const RechartsDoughnut = ({ watch }: { watch: UseFormWatch<DailyTimeFormType> }) => {
  // 活動スパンのデータ（スパン0は除外）
  const spanData = calcSpan(watch).filter((d) => d.span !== 0);

  // 時計用データ
  const clockData = clockDataObj;

  // 時計回りになるよう降順にする
  spanData.sort((a, b) => b.index - a.index);
  clockData.sort((a, b) => b.index - a.index);

  // 活動毎のスパン合計
  const activitySum = sumActivitySpan(spanData);

  const dataLabel = ({ name, cx, x, y }) => {
    const textAnchor = x > cx ? "start" : "end";
    return (
      <>
        {/* 引数で付属情報を受け取れます */}
        <Text x={x} y={y} textAnchor={textAnchor} fill="#82ca9d">
          {name}
        </Text>
      </>
    );
  };

  const clockLabel = ({ name, cx, x, y }) => {
    const textAnchor = "middle";
    return (
      <>
        {/* 引数で付属情報を受け取れます */}
        <Text x={x} y={y} textAnchor={textAnchor} fill="#82ca9d">
          {name}
        </Text>
      </>
    );
  };

  return (
    <>
      <PieChart width={700} height={300}>
        <Pie
          data={spanData}
          dataKey="span"
          nameKey="activity"
          startAngle={90}
          endAngle={450}
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={80}
          fill="#8884d8"
          label={dataLabel}
        />
        <Pie
          data={clockData}
          dataKey="value"
          nameKey="name"
          startAngle={90}
          endAngle={450}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={60}
          fill="#8884d8"
          label={clockLabel}
        />
      </PieChart>
    </>
  );
};

export default RechartsDoughnut;
