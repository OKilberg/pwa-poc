import { StyleSizes } from "./types";

export const getSizeStyling = (size?: StyleSizes) => {
  switch (size) {
    case "xs":
      return "text-xs md:text-base w-fit md:w-fit px-4 md:py-2 lg:py-2 md:rounded-md";
    case "sm":
      return "text-sm md:text-lg w-[200px] md:w-[300px] px-4 md:py-3 lg:py-3 md:rounded-lg";
    case "md":
      return "";
    case "lg":
      return "";
    case "xl":
      return "";
    case "md":
    default:
      return "py-3 md:py-6 w-[295px] md:w-[496px]";
  }
};
