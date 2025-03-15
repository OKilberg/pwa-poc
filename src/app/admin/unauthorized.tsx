import Button from "@/shared/components/Button/Button";
import Content from "@/shared/components/Content/Content";
import MainPane from "@/shared/components/MainPane/MainPane";
import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <MainPane>
      <Content>
        Unauthorized - You do not have permission to view this page.
        <Link className="" href={"/new"}>
          <Button variant="tertiary" className="underline">
            Return Home
          </Button>
        </Link>
      </Content>
    </MainPane>
  );
};

export default Unauthorized;
