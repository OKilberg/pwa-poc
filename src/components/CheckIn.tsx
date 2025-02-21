"use client";

import React, { useActionState } from "react";
import CodeInput from "./CodeInput";
import CheckInModal from "./CheckInModal";
import {
  getLocalUser,
  getLocalUserLatestCheckin,
  insertLocalEntry,
  updateLocalEntry,
} from "@/lib/dbLib";
import { postEntry } from "@/lib/serverLib";
import { wait } from "@/util/util";
import { EntryItemNoId } from "@/lib/types";

const submitCheckIn = async (_prevData: unknown, formData: FormData) => {
  const number1 = formData.get("code-1");
  const number2 = formData.get("code-2");
  const number3 = formData.get("code-3");
  const code = Number(`${number1}${number2}${number3}`);

  let checkInData: EntryItemNoId = {
    code,
    in: new Date().toISOString(),
    out: null,
  };

  const user = await getLocalUser(code);
  let result = {
    message: `No user with code ${code} exists.`,
    success: false,
    description: `Are you sure you entered the correct code?`,
  };

  if (user) {
    const latestCheckin = await getLocalUserLatestCheckin(code);

    if (latestCheckin) {
      const { id } = latestCheckin;

      const changes = {
        out: new Date().toISOString(),
      };

      const update = await updateLocalEntry(id, changes);

      const message = `Thanks for today ${user.firstname}`;
      const success = true;
      const description = `See you next time!`;

      result = { message, success, description };
    } else {
      const inserted = await insertLocalEntry(checkInData);

      if (inserted) {
        postEntry(checkInData); // No need to await

        const message = `Welcome ${user.firstname}`;
        const success = true;
        const description = `Now get to work...`;

        result = { message, success, description };
      } else {
        result = {
          message: `Failed to check in user with code ${code}.`,
          description: `Please try again. Contact an admin if the issue persists`,
          success: false,
        };
      }
    }
  }

  await wait(500);

  const modal = document.getElementById(
    "my_modal_1"
  ) as HTMLDialogElement | null;

  if (document && modal) {
    modal.showModal();
  }

  return result;
};

const CheckIn = () => {
  const [data, action, isLoading] = useActionState(submitCheckIn, undefined);

  return (
    <div>
      <div>
        <CodeInput action={action} isLoading={isLoading} />
        <CheckInModal result={data} />
      </div>
    </div>
  );
};

export default CheckIn;
