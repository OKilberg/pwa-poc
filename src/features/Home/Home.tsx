"use client";

import { getActiveLogEntry } from "@/lib/db/logs";
import { getUser } from "@/lib/db/users";
import { redirect } from "next/navigation";
import { startUserSession } from "@/lib/session/Session";
import Content from "@/shared/components/Content/Content";
import CurrentTime from "../ClockIn/Components/CurrentTime";
import Header from "@/shared/components/Header/Header";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import MainPane from "@/shared/components/MainPane/MainPane";
import PinForm from "@/shared/components/PinForm/PinForm";
import React, { useActionState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useCurrentDate from "@/shared/hooks/useCurrentDate";

const getCode = (formData: FormData) => {
  const number1 = formData.get("code-1");
  const number2 = formData.get("code-2");
  const number3 = formData.get("code-3");

  const code = Number(`${number1}${number2}${number3}`);

  return code;
};

const Home = () => {
  const submitPIN = async (_prevData: unknown, formData: FormData) => {
    const code = getCode(formData);
    const user = await getUser(code);

    if (user) {
      const { id } = user;
      const activeLogEntry = await getActiveLogEntry(id);

      const isClockedIn = !!activeLogEntry;
      if (isClockedIn) {
        const { inTime, id } = activeLogEntry;

        startUserSession({ ...user, isClockedIn, inTime, entryId: id });
      } else {
        startUserSession({ ...user, isClockedIn });
      }

      redirect("/clockin");
    }

    toast.error("Invalid PIN, try again", { duration: 1500 });
    return undefined;
  };

  const [state, action, isLoading] = useActionState(submitPIN, undefined);
  const currentDate = useCurrentDate();

  return (
    <MainPane>
      <Header>
        <HeaderTitle>
          <CurrentTime />
        </HeaderTitle>
        <HeaderSubtitle>{currentDate}</HeaderSubtitle>
      </Header>
      <Content>
        <p className="text-[24px]">Enter your PIN</p>
        <PinForm action={action} isLoading={isLoading} />
      </Content>
    </MainPane>
  );
};

export default Home;
