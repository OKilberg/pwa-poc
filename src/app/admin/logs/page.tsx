import Logs from "@/features/Logs/Logs";
import React, { Suspense } from "react";

const LogsPage = () => {
  return (
    <Suspense>
      <Logs />
    </Suspense>
  );
};

export default LogsPage;
