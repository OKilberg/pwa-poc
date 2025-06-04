"use client";

import { exportMonthlyLogsToXLSX } from "@/lib/export/export";
import { ensureAuth } from "@/lib/session/auth";
import AppBar from "@/shared/components/AppBar/AppBar";
import AppBarBack from "@/shared/components/AppBar/Subcomponents/AppBarBack";
import Content from "@/shared/components/Content/Content";
import MainPane from "@/shared/components/MainPane/MainPane";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { HardDriveDownload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const DataExport = () => {
  ensureAuth();
  const [date, setDate] = useState(dayjs());

  const handleExport = async () => {
    const month = date.month();
    const year = date.year();

    exportMonthlyLogsToXLSX(year, month)
      .then(() => {
        const exportMessage = `Exported logs from ${year}-${month + 1}`;
        toast.success(exportMessage, {
          icon: "✅",
          className: "md:text-xl",
        });
      })
      .catch(() => {
        const exportMessage = `An error occured when trying to export logs from ${year}-${
          month + 1
        }`;
        toast.error(exportMessage, {
          icon: "❌",
          className: "md:text-xl",
        });
      });
  };

  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
    }
  };

  return (
    <MainPane>
      <AppBar
        pageTitle={"Data Export"}
        pageDescription="Download work logs for export"
        leftChildren={<AppBarBack url="/admin" />}
        rightChildren={undefined}
      />
      <Content>
        <div className="grid grid-cols-1 gap-4">
          <DatePicker
            label="Select a month to export"
            value={date}
            openTo="month"
            onChange={handleDateChange}
            views={["year", "month"]}
          />
          <Button
            variant="contained"
            onClick={handleExport}
            startIcon={<HardDriveDownload />}
          >
            Download
          </Button>
        </div>
      </Content>
    </MainPane>
  );
};

export default DataExport;
