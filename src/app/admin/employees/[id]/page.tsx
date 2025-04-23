import RegisterAbsence from "@/features/Employees/Components/RegisterAbsence/RegisterAbsence";
import React from "react";

type Props = { params: Promise<{ id: string }> };

const page = async ({ params }: Props) => {
  const { id } = await params;

  return <RegisterAbsence userId={Number(id)} />;
};

export default page;
