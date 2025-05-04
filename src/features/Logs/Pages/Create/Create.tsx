import AppBar from "@/shared/components/AppBar/AppBar";
import AppBarActions from "@/shared/components/AppBar/Subcomponents/AppBarActions";
import AppBarBack from "@/shared/components/AppBar/Subcomponents/AppBarBack";
import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import CreateLogForm from "./Components/CreateLogForm";

const Create = () => {
  const LeftAppBarChildren = (
    <AppBarActions>
      <AppBarBack />
    </AppBarActions>
  );

  return (
    <MainPane>
      <AppBar leftChildren={LeftAppBarChildren} pageTitle="Create Log" />
      <CreateLogForm />
    </MainPane>
  );
};

export default Create;
