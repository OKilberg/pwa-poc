"use client";

import React from "react";
import CodeInput from "./CodeInput";
import CheckInModal from "./CheckInModal";
import { insertLocalEntry } from "@/lib/dbLib";
import { postEntry } from "@/lib/serverLib";

const submitCheckIn = async (formData: FormData) => {
  const number1 = formData.get("code-1");
  const number2 = formData.get("code-2");
  const number3 = formData.get("code-3");
  const code = Number(`${number1}${number2}${number3}`);

  const checkInData = {
    code,
    in: new Date().toISOString(),
    out: "",
  };

  const result = await insertLocalEntry(checkInData);

  const modal = document.getElementById(
    "my_modal_1"
  ) as HTMLDialogElement | null;
  if (document && modal && result) {
    modal.showModal();
  }

  await postEntry(checkInData);
};

const CheckIn = () => {
  return (
    <div>
      <div>
        <CodeInput action={submitCheckIn} />
        <CheckInModal />
      </div>
    </div>
  );
};

export default CheckIn;
