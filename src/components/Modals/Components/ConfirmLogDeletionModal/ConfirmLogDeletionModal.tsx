"use client";

import ConfirmActionModal from "@/shared/components/Modals/ConfirmActionModal/ConfirmActionModal";
import useCloseModal from "@/shared/providers/ModalContext/ContextHooks/useCloseModal";
import { CONFIRM_LOG_DELETION_MODAL } from "../../constants";
import useOnConfirm from "./Hooks/useOnConfirm";
import useLabel from "./Hooks/useLabel";

const ConfirmLogDeletionModal = () => {
  const closeModal = useCloseModal();
  const label = useLabel();
  const onConfirm = useOnConfirm();

  return (
    <ConfirmActionModal
      modalId={CONFIRM_LOG_DELETION_MODAL}
      onConfirm={onConfirm}
      onClose={closeModal}
    >
      {label}
    </ConfirmActionModal>
  );
};

export default ConfirmLogDeletionModal;
