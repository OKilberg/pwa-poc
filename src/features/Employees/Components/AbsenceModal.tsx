import { closeModalById } from "@/components/CheckIn/helpers";
import { absenceCauses } from "@/lib/constants";
import { addWorkAbsence } from "@/lib/db/absence";
import { AbsenceCause, NewWorkAbsence, User } from "@/lib/dbTypes";
import Button from "@/shared/components/Button/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

type AbsenceEmployeeModalProps = {
  employee: User;
  modalId: string;
};

const AbsenceEmployeeModal = ({
  employee,
  modalId,
}: AbsenceEmployeeModalProps) => {
  const { firstName, lastName, idn, id } = employee;
  const employeeDetails = `${firstName} ${lastName} (${idn})`;

  const [_cause, setCause] = useState<AbsenceCause>("sickLeave");

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const cause = e.target.value as AbsenceCause;

    setCause(cause);
  };

  const handleAbsenceEmployee = () => {
    const absence: NewWorkAbsence = {
      userId: id,
      dateStart: "",
      dateEnd: "",
      month: 0,
      year: 0,
      cause: "sickLeave",
      note: null,
    };

    addWorkAbsence(absence)
      .then(() => {
        // clearCacheKeys([""]);
        toast.success(`Absenced ${employeeDetails}`);
      })
      .catch(() => {
        toast.error(
          `Something went wrong. Could not add report absence ${employeeDetails}`
        );
      });
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Report Absence</h3>
        <p className="py-4">
          Select a cause, start date (and end date) for why {employeeDetails}{" "}
          was absent from work.
        </p>
        <label>Cause</label>
        <select
          defaultValue={"select"}
          className="select md:select-lg select-bordered w-full md:max-w-md"
          onChange={onSelectChange}
        >
          <option disabled value={"select"}>
            Select cause for absence
          </option>
          {Array.from(absenceCauses.entries()).map(([key, cause]) => (
            <option key={key} value={key}>
              {cause}
            </option>
          ))}
        </select>
        <DesktopDatePicker
          slotProps={{ popper: { sx: { zIndex: "2000 !important" } } }}
        />

        <form className="modal-action">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => closeModalById(modalId)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={handleAbsenceEmployee}
          >
            Confirm
          </Button>
        </form>
      </div>
    </dialog>
  );
};

export default AbsenceEmployeeModal;
