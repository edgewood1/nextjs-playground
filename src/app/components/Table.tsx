"use client";

import { Table } from "@mantine/core";
import { QO } from "../types/verbs";

interface HintTableProps {
  questionObj: QO;
}

export const HintTable = ({ questionObj }: HintTableProps) => {
  // A simple table to display hint information
  const rows = [
    { label: "Infinitive", value: questionObj.infinitive },
    { label: "Tense", value: questionObj.tense },
    { label: "Mood", value: questionObj.mood },
  ].map((element) => (
    <Table.Tr key={element.label}>
      <Table.Td>{element.label}</Table.Td>
      <Table.Td>{element.value}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt="md" withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Category</Table.Th>
          <Table.Th>Hint</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};