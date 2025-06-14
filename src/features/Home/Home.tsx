"use client";

import { getAdmins } from "@/lib/db/users";
import Content from "@/shared/components/Content/Content";
import CurrentTime from "../ClockIn/Components/CurrentTime";
import Header from "@/shared/components/Header/Header";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import MainPane from "@/shared/components/MainPane/MainPane";
import PinForm from "@/shared/components/PinForm/PinForm";
import React, { Suspense, useActionState, useEffect } from "react";
import useCurrentDate from "@/shared/hooks/useCurrentDate";
import ContentTitle from "@/shared/components/ContentTitle";
import ClockedInList from "./Components/ClockedInList";
import CreateAdminModal from "./Components/CreateAdminModal";
import { useTranslations } from "next-intl";
import useQuery from "@/shared/hooks/useQuery";
import useOnSubmitPIN from "./Hooks/useOnSubmitPIN";

const Home = () => {
  const admins = useQuery({ fn: getAdmins, key: "admins" });
  const shouldShowCreateAdminModal = !admins;
  const currentDate = useCurrentDate();
  const onSubmitPIN = useOnSubmitPIN();
  const t = useTranslations("Home");
  const [_state, action, isLoading] = useActionState(onSubmitPIN, undefined);

  useEffect(() => {
    if (shouldShowCreateAdminModal) {
      const modalElement = document.getElementById(
        "create_admin_modal"
      ) as HTMLDialogElement | null;

      if (modalElement) {
        modalElement.showModal();
      }
    }
  }, [shouldShowCreateAdminModal]);

  return (
    <MainPane>
      <CreateAdminModal />
      <Header>
        <HeaderTitle>
          <CurrentTime />
        </HeaderTitle>
        <HeaderSubtitle>{currentDate}</HeaderSubtitle>
      </Header>
      <Content>
        <p className="text-[16px] md:text-[24px]">{t("enterYourPin")}</p>
        <PinForm action={action} isLoading={isLoading} />
      </Content>
      <Content className="gap-2">
        <ContentTitle label={t("clockedInEmployees")} />
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-lg"></span>
          }
        >
          <ClockedInList />
        </Suspense>
      </Content>
    </MainPane>
  );
};

export default Home;
