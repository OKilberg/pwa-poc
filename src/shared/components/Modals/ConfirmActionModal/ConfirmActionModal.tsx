"use client";

import { Button } from "@mui/material";
import { ConfirmActionModalProps } from "./types";
import closeModalById from "../Helpers/closeModalById";

const ConfirmActionModal = ({
  children,
  modalId,
  onClose: propOnClose,
  onConfirm,
}: ConfirmActionModalProps) => {
  const defaultOnClose = () => {
    console.log("Running on close...");
    closeModalById(modalId);
  };

  const onClose = propOnClose ?? defaultOnClose;

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <form method="dialog">
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="warning" onClick={onConfirm}>
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmActionModal;
