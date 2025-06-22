"use client";

import { ParentComponent } from "@/shared/components/types";
import { createContext, useState } from "react";
import { ModalContextValues, ModalData } from "./types";
import showModalById from "./Helpers/showModalById";
import closeModalById from "./Helpers/closeModalById";

export const _ModalContext = createContext<ModalContextValues>({
  modalId: null,
  data: null,
  showModal: function (modalId: string, data: ModalData): void {
    throw new Error("Function not implemented.");
  },
  setData: function (data: ModalData): void {
    throw new Error("Function not implemented.");
  },
  setModalId: function (modalId: string): void {
    throw new Error("Function not implemented.");
  },
  closeModal: function (): void {
    throw new Error("Function not implemented.");
  },
});

const ModalContext = ({ children }: ParentComponent) => {
  const [modalId, setModalId] = useState<string | null>(null);
  const [data, setData] = useState<ModalData>(null);

  const showModal = (modalId: string, data: ModalData) => {
    setData(data);
    setModalId(modalId);
    setTimeout(() => {
      showModalById(modalId);
    }, 100);
  };

  const closeModal = () => {
    if (modalId) {
      console.log("closing", modalId);
      setData(null);
      closeModalById(modalId);
    }
  };

  const modalContextValues = {
    closeModal,
    data,
    modalId,
    setData,
    setModalId,
    showModal,
  };

  return <_ModalContext value={modalContextValues}>{children}</_ModalContext>;
};

export default ModalContext;
