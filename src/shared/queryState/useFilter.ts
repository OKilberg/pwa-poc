import { parseAsStringLiteral, useQueryState } from "nuqs";

const FILTERS = ["archived"] as const;
export type FILTER_TYPE = (typeof FILTERS)[number];

const useFilter = () => {
  const [filter, setFilter] = useQueryState(
    "filter",
    parseAsStringLiteral(FILTERS)
  );

  return { filter, setFilter };
};

export default useFilter;
