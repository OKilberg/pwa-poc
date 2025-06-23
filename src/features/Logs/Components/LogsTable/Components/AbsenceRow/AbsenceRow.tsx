import { WorkAbsence } from "@/lib/dbTypes";
import { EllipsisVertical, TreePalm } from "lucide-react";
import { useState } from "react";
import LogActionsDrawer from "../../../LogActionsDrawer/LogActionsDrawer";
// import { useTranslations } from "next-intl";
import getReadableAbsence from "@/features/Logs/Helpers/getReadableAbsence";
import DrawerContentAbsence from "../../../LogActionsDrawer/Components/DrawerContentAbsence";

const AbsenceRow = ({ absence }: { absence: WorkAbsence }) => {
  // const t = useTranslations("Absence"); TODO: cause
  const { id, note } = absence;
  const { duration, endDate, startDate } = getReadableAbsence(absence);
  const dates =
    startDate !== endDate ? `${startDate} - ${endDate}` : `${startDate}`;
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <tr>
      <td>
        <div>
          <div className="font-bold">{id}</div>
        </div>
      </td>
      <td>
        <TreePalm size={18} />
      </td>
      <td className="text-center">
        <time className="text-center">{`${dates}`}</time>
      </td>
      <td className="text-center">
        <time className="text-center">{`-`}</time>
      </td>
      <td className="text-center">
        <div>{duration}</div>
      </td>
      <td className="text-center">
        <div>{note}</div>
      </td>
      <td className="" onClick={() => setShowDrawer(true)}>
        <EllipsisVertical className="mx-auto" />
      </td>
      {
        <LogActionsDrawer
          showDrawer={showDrawer}
          closeDrawer={() => setShowDrawer(false)}
        >
          <DrawerContentAbsence absence={absence} />
        </LogActionsDrawer>
      }
    </tr>
  );
};

export default AbsenceRow;
