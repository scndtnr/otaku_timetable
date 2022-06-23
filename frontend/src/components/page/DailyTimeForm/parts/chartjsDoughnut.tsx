import { Container } from "@chakra-ui/react";
import { UseFormWatch } from "react-hook-form";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Color, Legend, LegendItem } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { calcSpan } from "../../../model/calcActivitySpan";
import { DailyTimeFormType } from "../../../model/types";
import doughnutData, { generateLegendLabels } from "./chartjsDoughnutData";

export const ChartjsDoughnut = ({ watch }: { watch: UseFormWatch<DailyTimeFormType> }) => {
  const LegendMargin = {
    id: "customSpacingLegend",
    beforeInit(chart: any) {
      // Get reference to the original fit function
      const originalFit = chart.legend.fit;

      // Override the fit function
      chart.legend.fit = function fit() {
        // Call original function and bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)();
        // Change the height as suggested in another answers
        this.height += 20;
      };
    },
  };

  // 円グラフの設定
  ChartJS.register(ArcElement, ChartDataLabels, Legend, LegendMargin);

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
              position: "top",
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
              borderWidth: 1,
              borderColor: (ctx) => (ctx.dataset.datalabels as any).labelBorderColor as Color,
              backgroundColor: (ctx) =>
                (ctx.dataset.datalabels as any).labelBackgroundColor as Color,
              display: (ctx) => ctx.dataset.data[ctx.dataIndex] !== 0,
              align: (ctx) => ctx.dataset.datalabels?.align as "center" | "end",
              offset: 10,
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
