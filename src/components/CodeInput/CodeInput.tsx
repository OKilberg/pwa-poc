"use client";

import React, { useEffect, useRef, useState } from "react";
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

const CodeInput = ({ action, isLoading }: Props) => {
  const code1Ref = useRef<HTMLInputElement>(null);
  const code2Ref = useRef<HTMLInputElement>(null);
  const code3Ref = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const afterChange = () => {
    const allCodesHaveValues = getAllCodesHaveValues([
      code1Ref.current,
      code2Ref.current,
      code3Ref.current,
    ]);

    if (!allCodesHaveValues) {
      return setSubmitDisabled(true);
    }

    setSubmitDisabled(false);
  };

  useEffect(() => {
    const submit = submitRef.current;

    if (submit && !submitDisabled) {
      submit.focus();
    }
  }, [submitDisabled]);

  return (
    <form className="max-w-sm mx-auto mt-4" action={action}>
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
          inputNext="code-submit"
          ref={code3Ref}
        />
      </div>

      <button
        ref={submitRef}
        type="submit"
        id="code-submit"
        value={"Check In"}
        className={
          isLoading
            ? "btn btn-disabled mt-8 w-full"
            : "btn btn-primary mt-8 w-full"
        }
        disabled={submitDisabled}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Check in"
        )}
      </button>
    </form>
  );
};

export default CodeInput;
