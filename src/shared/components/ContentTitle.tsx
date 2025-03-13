import React from "react";

type ContentTitleProps = {
  label: string;
};

const ContentTitle = ({ label }: ContentTitleProps) => {
  return <h3 className="font-semibold text-2xl w-full px-5">{label}</h3>;
};

export default ContentTitle;
