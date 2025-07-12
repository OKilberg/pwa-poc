import { useContext } from "react";
import { _ModalContext } from "../ModalContext";

const useModalContext = () => {
  const modalContext = useContext(_ModalContext);

  return modalContext;
};

export default useModalContext;
