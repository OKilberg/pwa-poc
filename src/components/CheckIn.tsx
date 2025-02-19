"use client";

import { db } from "@/app/db";
import React, { useState } from "react";
import CodeInput from "./CodeInput";
import CheckInModal from "./CheckInModal";

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

  const postUrl = "http://localhost:3001/entries";

  await db.table("posts").add(checkInData);

  const modal = document.getElementById(
    "my_modal_1"
  ) as HTMLDialogElement | null;
  if (document && modal) {
    modal.showModal();
  }

  try {
    const response = await fetch(postUrl, {
      method: "POST",
      body: JSON.stringify(checkInData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.log(
        "Error, not possible to post to server, only saved locally..."
      );
      // await db.table("posts").add(checkInData);
    }

    const checkInPost = await response.json();
    console.log("Server available, posted to server...");

    return checkInPost;
  } catch (error) {
    console.log("Error, not possible to post to server, caching locally...");
  }
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
