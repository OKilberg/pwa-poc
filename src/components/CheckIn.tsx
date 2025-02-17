"use client";

import { db } from "@/app/db";
import React from "react";

const submitCheckIn = async () => {
  const checkInData = {
    code: 123,
    in: new Date().toISOString(),
    out: "",
  };

  const postUrl = "http://localhost:3001/entries";

  try {
    const response = await fetch(postUrl, {
      method: "POST",
      body: JSON.stringify(checkInData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.log("Error, not possible to post to server, caching locally...");
      await db.table("posts").add(checkInData);
    }

    const checkInPost = await response.json();
    console.log("Server available, posted to server...");

    return checkInPost;
  } catch (error) {
    console.log("Error, not possible to post to server, caching locally...");
    await db.table("posts").add(checkInData);
  }
};

const CheckIn = () => {
  return (
    <div>
      CheckIn Here
      <div>
        <button onClick={submitCheckIn}>CheckIn</button>
      </div>
    </div>
  );
};

export default CheckIn;
