export type ModalData = unknown | null; // Add types here

export type ModalContextValues = {
  modalId: string | null;
  data: ModalData | null;
  showModal: (modalId: string, data?: ModalData) => void;
  closeModal: () => void;
  setData: (data: ModalData) => void;
  setModalId: (modalId: string) => void;
};
