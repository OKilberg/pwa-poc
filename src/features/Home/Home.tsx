"use client";

import Button from "@/shared/components/Button/Button";
import Content from "@/shared/components/Content/Content";
import Header from "@/shared/components/Header/Header";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import MainPane from "@/shared/components/MainPane/MainPane";
import React, { useActionState } from "react";
import CurrentTime from "../ClockIn/Components/CurrentTime";
import { startUserSession } from "@/lib/session/Session";
import { getUser } from "@/lib/db/users";
import { redirect } from "next/navigation";
import PinForm from "@/shared/components/PinForm/PinForm";

type Props = {};

const getCode = (formData: FormData) => {
  const number1 = formData.get("code-1");
  const number2 = formData.get("code-2");
  const number3 = formData.get("code-3");

  const code = Number(`${number1}${number2}${number3}`);

  return code;
};

const Home = (props: Props) => {
  const submitPIN = async (_prevData: unknown, formData: FormData) => {
    const code = getCode(formData);
    const user = await getUser(code);

    if (user) {
      startUserSession(user);
      redirect("/clockin");
    }
    return undefined;
  };

  const [state, action, isLoading] = useActionState(submitPIN, undefined);

  return (
    <MainPane>
      <Header>
        <HeaderTitle>
          <CurrentTime />
        </HeaderTitle>
        <HeaderSubtitle>8 March, 2025</HeaderSubtitle>
      </Header>
      <Content>
        <p className="text-[24px]">Enter your PIN</p>
        <PinForm action={action} isLoading={isLoading} />
      </Content>
    </MainPane>
  );
};

export default Home;
