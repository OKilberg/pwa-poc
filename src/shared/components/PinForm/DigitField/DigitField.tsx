import React, { Ref } from "react";
import useOnChange from "./Hooks/useOnChange";

type Props = {
  autoFocus?: boolean;
  inputName: string;
  inputNext: string;
  afterChange?: () => void;
  ref: Ref<HTMLInputElement>;
};

const DigitField = ({
  autoFocus,
  afterChange,
  inputName,
  inputNext,
  ref,
}: Props) => {
  const onChange = useOnChange(afterChange);

  return (
    <div>
      <label htmlFor={inputName} className="sr-only">
        First code
      </label>
      <input
        autoFocus={autoFocus}
        className="block w-20 h-[88px] py-3 text-sm font-extrabold text-center text-gray-900 bg-white border-4 border-[#666666] rounded-3xl focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        data-focus-input-init
        data-focus-input-next={inputNext}
        id={inputName}
        maxLength={1}
        min={0}
        max={9}
        name={inputName}
        onInput={onChange}
        ref={ref}
        required
        type="number"
      />
    </div>
  );
};

export default DigitField;
