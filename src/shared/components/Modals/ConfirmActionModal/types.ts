import { ParentComponent } from "../../types";

export type ConfirmActionModalProps = ParentComponent & {
  modalId: string;
  onConfirm: () => void;
  onClose?: () => void;
};
