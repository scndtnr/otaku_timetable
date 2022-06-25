import { Button, HStack, Input, useClipboard } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";
import { DailyTimeFormPartsType, DailyTimeFormType } from "./types";

const rison = require("rison-node");
const LZString = require("lz-string");

export const encodeSchedule = (schedule: DailyTimeFormPartsType[]): string => {
  const scheduleList = schedule.map((s) => [s.time, s.category, s.activity]);
  return LZString.compressToEncodedURIComponent(rison.encode(scheduleList));
};

export const decodeSchedule = (encodedSchedule: string) =>
  rison
    .decode(LZString.decompressFromEncodedURIComponent(encodedSchedule))
    .map((s: string[]) => ({ time: s[0], category: s[1], activity: s[2] }));

const generateQueryString = (watch: UseFormWatch<DailyTimeFormType>): string => {
  const paramsObj = {
    schedule: encodeSchedule(watch("schedule")),
  };
  return Object.entries(paramsObj)
    .map((p) => `${p[0]}=${p[1]}`)
    .join("&");
};

type ShareButoonType<T extends FieldValues> = {
  watch: UseFormWatch<DailyTimeFormType>;
} & T;

export const UrlButton = <T extends FieldValues>({ watch, field }: ShareButoonType<T>) => {
  const [url, setUrl] = useState("");
  const { hasCopied, onCopy } = useClipboard(url);

  const { pathname } = useRouter();
  const domain = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

  const handleClick = () => {
    setUrl(`${domain}${pathname}?${generateQueryString(watch)}`);
  };

  return (
    <HStack {...field}>
      <Button onClick={handleClick}>URL生成</Button>
      <Input readOnly value={url} maxW="200px" />
      <Button onClick={onCopy} ml={2}>
        {hasCopied ? "Copied" : "Copy"}
      </Button>
    </HStack>
  );
};
