import Header from "@/shared/components/Header/Header";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import React from "react";

type Props = {};

const EmployeesHeader = (props: Props) => {
  return (
    <Header>
      <HeaderTitle>Employees</HeaderTitle>
      <HeaderSubtitle></HeaderSubtitle>
    </Header>
  );
};

export default EmployeesHeader;
