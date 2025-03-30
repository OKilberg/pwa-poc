"use client";

import { useLocale } from "next-intl";
import useCurrentTime from "./useCurrentTime";

const useCurrentDate = () => {
  const currentTime = useCurrentTime();
  const locale = useLocale();

  const currentDate = currentTime.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return currentDate;
};

export default useCurrentDate;
