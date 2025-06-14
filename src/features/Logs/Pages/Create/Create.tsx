"use client";

import MainPane from "@/shared/components/MainPane/MainPane";
import React, { ChangeEvent, Suspense, useState } from "react";
import CreateLogForm from "./Components/CreateLogForm/CreateLogForm";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import { LOGTYPE } from "@/shared/queryState/useLogTypes";
import CreateAbsenceForm from "./Components/CreateAbsenceForm/CreateAbsenceForm";
import LogTypeRadioButton from "./Components/LogTypeRadioButton/LogTypeRadioButton";
import getBackLink from "../../Helpers/getBackLink";
import { useSearchParams } from "next/navigation";

const Create = () => {
  const [createType, setCreateType] = useState<LOGTYPE>("log");
  const searchParams = useSearchParams();

  const showCreateLogForm = createType === "log";
  const showCreateAbsenceForm = createType === "absence";

  const handleSetCreateType = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as LOGTYPE;

    setCreateType(value);
  };
  const month = searchParams.get("month");
  const employee = searchParams.get("employee");
  const backLink =
    month && employee
      ? getBackLink(Number(employee), Number(month))
      : `/admin/logs`;

  return (
    <MainPane className="h-[calc(100vh-3rem)] min-h-0">
      <DefaultAppBar
        pageTitle={`Create ${createType}`}
        pageDescription="Manually submit a work log for an employee"
        url={backLink}
      />
      <div className="grid grid-cols-2 px-4 pb-3">
        <LogTypeRadioButton
          checked={showCreateLogForm}
          value={"log"}
          onChange={handleSetCreateType}
        />
        <LogTypeRadioButton
          checked={showCreateAbsenceForm}
          value={"absence"}
          onChange={handleSetCreateType}
        />
      </div>
      <section className="flex flex-col min-h-0 flex-1 overflow-auto pb-6">
        {showCreateLogForm && (
          <Suspense>
            <CreateLogForm />
          </Suspense>
        )}
        {showCreateAbsenceForm && (
          <Suspense>
            <CreateAbsenceForm />
          </Suspense>
        )}
      </section>
    </MainPane>
  );
};

export default Create;
