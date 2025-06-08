import MainPane from "@/shared/components/MainPane/MainPane";
import React, { Suspense } from "react";
import CreateLogForm from "./Components/CreateLogForm";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";

const Create = () => {
  return (
    <MainPane>
      <DefaultAppBar
        pageTitle="Create log"
        pageDescription="Manually submit a work log for an employee"
        url="/admin/logs"
      />
      <Suspense>
        <CreateLogForm />
      </Suspense>
    </MainPane>
  );
};

export default Create;
