import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from "nuqs";

const LOGTYPES = ["log", "absence"] as const;

export type LOGTYPE = (typeof LOGTYPES)[number];

const useLogTypes = () => {
  const [logTypes, setLogTypes] = useQueryState(
    "logTypes",
    parseAsArrayOf(parseAsStringLiteral(LOGTYPES)).withDefault([
      "log",
      "absence",
    ])
  );

  return { logTypes, setLogTypes };
};

export default useLogTypes;
