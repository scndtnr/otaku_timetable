import { Container } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { UseFormWatch } from "react-hook-form";
import { calcSpan } from "../lib/calcActivitySpan";
import { DailyTimeFormType } from "../lib/types";
import doughnutData, { generateLegendLabels } from "./doughnutData";
import { Chart as ChartJS, ArcElement, Color, Legend, LegendItem } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export const ChartjsDoughnut = ({ watch }: { watch: UseFormWatch<DailyTimeFormType> }) => {
  // 円グラフの設定
  ChartJS.register(ArcElement, ChartDataLabels, Legend);

  return (
    <Container className="chart-container" position="relative" h="400" w="full">
      <Doughnut
        data={doughnutData(calcSpan(watch))}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 30,
          },
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                generateLabels: (chart) => {
                  const legentItems = generateLegendLabels(calcSpan(watch)) as LegendItem[];
                  return legentItems;
                },
              },
            },
            datalabels: {
              font: {
                family: "monospace",
              },
              display: (ctx) => ctx.dataset.data[ctx.dataIndex] !== 0,
              align: (ctx) => ctx.dataset.datalabels?.align as "center" | "end",
              offset: 20,
              formatter: (value, ctx) => {
                const labels = ctx.dataset.datalabels?.labels;
                return labels ? labels[ctx.dataIndex] : "undefined";
              },
              color: (ctx) => ctx.dataset.datalabels?.color as Color,
            },
          },
        }}
      />
    </Container>
  );
};
