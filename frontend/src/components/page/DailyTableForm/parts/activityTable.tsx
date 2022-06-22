import { UseFormWatch } from "react-hook-form";
import { DailyTimeFormType } from "../../../model/types";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { calcSpan } from "../../../model/calcActivitySpan";
import { timeGroups } from "../../../model/selectGroups";

const ActivityTable = ({ watch }: { watch: UseFormWatch<DailyTimeFormType> }) => {
  // 活動スパンのデータ（スパン0は除外）
  const spanData = calcSpan(watch).filter((d) => d.span !== 0);
  const timeLine = spanData.map((d) => {
    const timeLabel = timeGroups.find((time) => time.value === d.rawTime)?.label;
    return { ...d, label: timeLabel };
  });

  return (
    <TableContainer>
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th>Start Time</Th>
            <Th>Duration</Th>
            <Th>Activity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {timeLine.map(({ label, activity, span }) => {
            return (
              <Tr key={(label || "label") + "-" + span}>
                <Td whiteSpace="pre-wrap">{label}</Td>
                <Td whiteSpace="pre-wrap">{span} h</Td>
                <Td whiteSpace="pre-wrap">{activity}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ActivityTable;
