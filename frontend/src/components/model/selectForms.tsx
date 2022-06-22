import { Box, Select, SelectProps } from "@chakra-ui/react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { activityGroups, timeGroups } from "./selectGroups";

type SelectFormType<T extends FieldValues> = SelectProps & UseControllerProps<T>;

export const SelectTime = <T extends FieldValues>(props: SelectFormType<T>) => {
  const { field } = useController(props);

  return (
    <Select maxW="100" {...field} onBlur={props.onBlur}>
      {timeGroups.map((g) => (
        <Box as="option" key={g.label} value={g.value}>
          {g.label}
        </Box>
      ))}
    </Select>
  );
};

export const SelectActivity = <T extends FieldValues>(props: SelectFormType<T>) => {
  const { field } = useController(props);

  return (
    <Select maxW="200" {...field}>
      {activityGroups.map((g) => (
        <Box as="option" key={g.value} value={g.value}>
          {g.label}
        </Box>
      ))}
    </Select>
  );
};
