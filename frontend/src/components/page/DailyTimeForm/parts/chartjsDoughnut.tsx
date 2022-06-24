import { Container } from "@chakra-ui/react";
import { UseFormWatch } from "react-hook-form";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Color, Legend, LegendItem } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { calcSpan } from "../../../model/calcSpan";
import { DailyTimeFormType } from "../../../model/types";
import doughnutData, {
  activitySumLegendLabels,
  categorySumLegendLabels,
} from "./chartjsDoughnutData";
import { LabelOptions } from "chartjs-plugin-datalabels/types/options";

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
        this.height += 40;
      };
    },
  };

  // 円グラフの設定
  ChartJS.register(ArcElement, ChartDataLabels, Legend, LegendMargin);

  return (
    <Container className="chart-container" position="relative" h="450" w="full">
      <Doughnut
        data={doughnutData(calcSpan(watch))}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 45,
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                generateLabels: (chart) => {
                  // const legentItems = activitySumLegendLabels(calcSpan(watch)) as LegendItem[];
                  const legentItems = categorySumLegendLabels(calcSpan(watch)) as LegendItem[];
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
              display: (ctx) => {
                // span === 0 なら表示しない
                if (ctx.dataset.data[ctx.dataIndex] === 0) {
                  return false;
                }

                // datalabels が存在しないなら全て表示する
                const datalabels = ctx.dataset.datalabels;
                if (!datalabels) {
                  return true;
                }

                // 先頭と末尾が同じラベルなら、先頭は表示しない
                const labels = datalabels.labels as Record<string, LabelOptions | null>;
                const maxIndex: number = (datalabels as any).labelLength - 1;
                if (ctx.dataIndex === 0 && labels[0] === labels[maxIndex]) {
                  return false;
                }

                // それ以外は表示する
                return true;
              },
              align: (ctx) => ctx.dataset.datalabels?.align as "center" | "end",
              offset: (ctx) => (ctx.dataIndex % 2 === 0 ? 30 : 0),
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
