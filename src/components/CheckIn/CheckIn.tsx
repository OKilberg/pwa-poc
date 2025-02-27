"use client";

import React, { useActionState } from "react";
import CodeInput from "../CodeInput/CodeInput";
import CheckInModal from "../CheckInModal";
import { submitCodeAction } from "./actions";

const CheckIn = () => {
  const [modalProps, action, isLoading] = useActionState(
    submitCodeAction,
    undefined
  );

  return (
    <div>
      <div>
        <CodeInput action={action} isLoading={isLoading} />
        <CheckInModal result={modalProps} />
      </div>
    </div>
  );
};

export default CheckIn;
