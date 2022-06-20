import { Button, HStack, Input, useNumberInput, UseNumberInputProps } from "@chakra-ui/react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type InputHoursProps<T extends FieldValues> = UseNumberInputProps & UseControllerProps<T>;

const InputHours = <T extends FieldValues>(props: InputHoursProps<T>) => {
  const { field } = useController<T>(props);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 0.25,
    min: 0,
    max: 24,
    precision: 2,
    format: (val) => val + ` h`,
    parse: (val) => val.replace(/\sh$/, ""),
    pattern: "[0-9]*(.[0-9]+)?(\\sh)?",
    ...field,
  });

  return (
    <HStack maxW="220px">
      <Input {...getInputProps()} />
      <Button {...getDecrementButtonProps()}>-</Button>
      <Button {...getIncrementButtonProps()}>+</Button>
    </HStack>
  );
};

export default InputHours;
