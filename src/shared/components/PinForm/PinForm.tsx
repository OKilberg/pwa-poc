"use client";

import React, { useRef } from "react";
import DigitField from "./Components/DigitField/DigitField";

type Props = {
  action: (formData: FormData) => void;
  isLoading: boolean;
};

const getAllCodesHaveValues = (inputs: Array<HTMLInputElement | null>) => {
  const allCodesHaveValues = inputs.every((input) => {
    if (input) {
      const inputHasOneValue = input.value.length === 1;

      return inputHasOneValue;
    }
  });

  return allCodesHaveValues;
};

const PinForm = ({ action, isLoading }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const code1Ref = useRef<HTMLInputElement>(null);
  const code2Ref = useRef<HTMLInputElement>(null);
  const code3Ref = useRef<HTMLInputElement>(null);

  const afterChange = () => {
    const allCodesHaveValues = getAllCodesHaveValues([
      code1Ref.current,
      code2Ref.current,
      code3Ref.current,
    ]);

    if (allCodesHaveValues) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form className="max-w-sm mx-auto" action={action} ref={formRef}>
      <div className="flex mb-2 space-x-2 justify-center">
        <DigitField
          afterChange={afterChange}
          autoFocus
          inputName="code-1"
          inputNext="code-2"
          ref={code1Ref}
        />
        <DigitField
          afterChange={afterChange}
          inputName="code-2"
          inputNext="code-3"
          ref={code2Ref}
        />
        <DigitField
          afterChange={afterChange}
          inputName="code-3"
          inputNext="code-1"
          ref={code3Ref}
        />
      </div>
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : null}
    </form>
  );
};

export default PinForm;
