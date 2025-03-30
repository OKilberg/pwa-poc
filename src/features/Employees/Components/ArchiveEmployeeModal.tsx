import { closeModalById } from "@/components/CheckIn/helpers";
import { setUserState } from "@/lib/db/users";
import { User } from "@/lib/dbTypes";
import { clearCacheKeys } from "@/lib/queryCache/queryCache";
import Button from "@/shared/components/Button/Button";
import React from "react";
import toast from "react-hot-toast";

type ArchiveEmployeeModalProps = {
  employee: User;
  modalId: string;
};

const ArchiveEmployeeModal = ({
  employee,
  modalId,
}: ArchiveEmployeeModalProps) => {
  const { firstName, lastName, idn, id } = employee;
  const employeeDetails = `${firstName} ${lastName} (${idn})`;

  const handleArchiveEmployee = () => {
    setUserState(id, "archived")
      .then(() => {
        clearCacheKeys(["employees", "activeEmployeesMap"]);
        toast.success(`Archived ${employeeDetails}`);
      })
      .catch(() => {
        toast.error(
          `Something went wrong. Could not archive ${employeeDetails}`
        );
      });
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Archiving</h3>
        <p className="py-4">
          Are you sure you want to archive {employeeDetails}? Employee will be
          hidden, but their records will still exist in the database.
        </p>
        <form className="modal-action">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => closeModalById(modalId)}
          >
            Back
          </Button>
          <Button
            variant="negative"
            type="submit"
            size="sm"
            onClick={handleArchiveEmployee}
          >
            Confirm
          </Button>
        </form>
      </div>
    </dialog>
  );
};

export default ArchiveEmployeeModal;
