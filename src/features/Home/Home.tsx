import Button from "@/shared/components/Button/Button";
import Content from "@/shared/components/Content/Content";
import Header from "@/shared/components/Header/Header";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import MainPane from "@/shared/components/MainPane/MainPane";
import React from "react";
import CurrentTime from "../ClockIn/Components/CurrentTime";

type Props = {};

const Home = (props: Props) => {
  return (
    <MainPane>
      <Header>
        <HeaderTitle>
          <CurrentTime />
        </HeaderTitle>
        <HeaderSubtitle>8 March, 2025</HeaderSubtitle>
      </Header>
      <Content>
        <Button variant="primary">Hello</Button>
        <Button variant="secondary">Goodbye</Button>
      </Content>
    </MainPane>
  );
};

export default Home;
