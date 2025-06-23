"use client";

import ConfirmActionModal from "@/shared/components/Modals/ConfirmActionModal/ConfirmActionModal";
import useCloseModal from "@/shared/providers/ModalContext/ContextHooks/useCloseModal";
import { CONFIRM_ABSENCE_DELETION_MODAL } from "../../constants";
import useOnConfirm from "./Hooks/useOnConfirm";
import useLabel from "./Hooks/useLabel";
import useDescription from "./Hooks/useDescription";
import ModalLabel from "@/shared/components/Modals/Subcomponents/ModalLabel";
import ModalDescription from "@/shared/components/Modals/Subcomponents/ModalDescription";

const ConfirmAbsenceDeletionModal = () => {
  const closeModal = useCloseModal();
  const label = useLabel();
  const description = useDescription();
  const onConfirm = useOnConfirm();

  return (
    <ConfirmActionModal
      modalId={CONFIRM_ABSENCE_DELETION_MODAL}
      onConfirm={onConfirm}
      onClose={closeModal}
    >
      <ModalLabel>{label}</ModalLabel>
      <ModalDescription>{description}</ModalDescription>
    </ConfirmActionModal>
  );
};

export default ConfirmAbsenceDeletionModal;
