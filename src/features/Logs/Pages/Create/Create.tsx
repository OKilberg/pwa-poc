import AppBar from "@/shared/components/AppBar/AppBar";
import AppBarActions from "@/shared/components/AppBar/Subcomponents/AppBarActions";
import AppBarBack from "@/shared/components/AppBar/Subcomponents/AppBarBack";
import AppBarIconAction from "@/shared/components/AppBar/Subcomponents/AppBarIconAction";
import MainPane from "@/shared/components/MainPane/MainPane";
import { Calendar, Ellipsis } from "lucide-react";
import React from "react";
import CreateLogForm from "./Components/CreateLogForm";

const Create = () => {
  const LeftAppBarChildren = (
    <AppBarActions>
      <AppBarBack />
    </AppBarActions>
  );

  const RightAppBarChildren = (
    <AppBarActions>
      <AppBarIconAction>
        <Calendar />
      </AppBarIconAction>
      <AppBarIconAction>
        <Ellipsis />
      </AppBarIconAction>
    </AppBarActions>
  );

  return (
    <MainPane>
      <AppBar
        leftChildren={LeftAppBarChildren}
        rightChildren={RightAppBarChildren}
        pageTitle="Create Log"
      />
      <CreateLogForm />
    </MainPane>
  );
};

export default Create;
