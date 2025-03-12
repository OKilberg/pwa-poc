import React from "react";
import {
  getHasOneValue,
  getNextInputId,
  getInputElement,
} from "../Helpers/helpers";

const useOnChange = (afterChange?: VoidFunction) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const hasOneValue = getHasOneValue(input);

    if (hasOneValue) {
      const nextInputId = getNextInputId(input);

      if (!nextInputId) {
        return;
      }

      const nextInput = getInputElement(nextInputId);

      nextInput?.focus();
    }

    typeof afterChange === "function" && afterChange();
  };

  return onChange;
};

export default useOnChange;
