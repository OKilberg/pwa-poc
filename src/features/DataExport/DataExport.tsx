"use client";

import { exportMonthlyLogsToXLSX } from "@/lib/export/export";
import { ensureAuth } from "@/lib/session/auth";
import Button from "@/shared/components/Button/Button";
import Content from "@/shared/components/Content/Content";
import Header from "@/shared/components/Header/Header";
import HeaderSubtitle from "@/shared/components/Header/Subcomponents/HeaderSubtitle";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import MainPane from "@/shared/components/MainPane/MainPane";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ArrowLeft, HardDriveDownload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DataExport = () => {
  ensureAuth();
  const { push } = useRouter();
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainPane>
        <Header>
          <HeaderTitle>Data Export</HeaderTitle>
          <HeaderSubtitle>Download monthly logs in xlsx format</HeaderSubtitle>
        </Header>
        <Content>
          <DatePicker
            label="Select a month to export"
            value={date}
            openTo="month"
            onChange={handleDateChange}
            views={["year", "month"]}
          />
          <Button variant="primary" onClick={handleExport}>
            <HardDriveDownload />
            Download
          </Button>
          <Button variant="tertiary" onClick={() => push("/admin")}>
            <ArrowLeft className="" />
            Back
          </Button>
        </Content>
      </MainPane>
    </LocalizationProvider>
  );
};

export default DataExport;
