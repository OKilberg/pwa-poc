"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  action: (formData: FormData) => void;
  isLoading: boolean;
};

const CodeInput = ({ action, isLoading }: Props) => {
  const code1Ref = useRef<HTMLInputElement>(null);
  const code2Ref = useRef<HTMLInputElement>(null);
  const code3Ref = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    // Ensuring that refs are not null before proceeding
    const code1 = code1Ref.current;
    const code2 = code2Ref.current;
    const code3 = code3Ref.current;

    console.log("REFS", code1, code2, code3);

    if (code1 && code2 && code3) {
      const getShouldEnableSubmit = () => {
        const shouldSetSubmitDisabled =
          code1.value.length === 1 &&
          code2.value.length === 1 &&
          code3.value.length === 1;

        return shouldSetSubmitDisabled;
      };

      const getShouldFocusNext = (el: HTMLInputElement) => {
        const shouldFocusNext = el.value.length === 1;

        return shouldFocusNext;
      };

      const handleSubmitState = () => {
        const shouldEnableSubmit = getShouldEnableSubmit();

        setSubmitDisabled(!shouldEnableSubmit);
      };

      const handleInput1 = () => {
        if (getShouldFocusNext(code1)) {
          code2.focus();
        }
        handleSubmitState();
      };

      const handleInput2 = () => {
        if (getShouldFocusNext(code2)) {
          code3.focus();
        }
        handleSubmitState();
      };

      const handleInput3 = () => {
        if (getShouldFocusNext(code3)) {
          handleSubmitState();
        }
      };

      code1.addEventListener("input", handleInput1);
      code2.addEventListener("input", handleInput2);
      code3.addEventListener("input", handleInput3);

      // Cleanup event listeners when component unmounts
      return () => {
        code1.removeEventListener("input", handleInput1);
        code2.removeEventListener("input", handleInput2);
        code3.removeEventListener("input", handleInput3);
      };
    }

    // Return empty cleanup function if refs are null
    return () => {};
  }, []);

  useEffect(() => {
    const submit = submitRef.current;

    if (submit && !submitDisabled) {
      submit.focus();
    }
  }, [submitDisabled]);

  return (
    <form className="max-w-sm mx-auto" action={action}>
      <div className="flex mb-2 space-x-2 justify-center">
        <div>
          <label htmlFor="code-1" className="sr-only">
            First code
          </label>
          <input
            name="code-1"
            type="text"
            ref={code1Ref}
            maxLength={1}
            data-focus-input-init
            data-focus-input-next="code-2"
            id="code-1"
            className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label htmlFor="code-2" className="sr-only">
            Second code
          </label>
          <input
            name="code-2"
            type="text"
            ref={code2Ref}
            maxLength={1}
            data-focus-input-init
            data-focus-input-prev="code-1"
            data-focus-input-next="code-3"
            id="code-2"
            className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label htmlFor="code-3" className="sr-only">
            Third code
          </label>
          <input
            name="code-3"
            type="text"
            ref={code3Ref}
            maxLength={1}
            data-focus-input-init
            data-focus-input-prev="code-2"
            data-focus-input-next="code-4"
            id="code-3"
            className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        </div>
      </div>

      <button
        ref={submitRef}
        type="submit"
        value={"Check In"}
        className={isLoading ? "btn btn-disabled mt-4" : "btn btn-primary mt-4"}
        disabled={submitDisabled}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Check In"
        )}
      </button>
    </form>
  );
};

export default CodeInput;
