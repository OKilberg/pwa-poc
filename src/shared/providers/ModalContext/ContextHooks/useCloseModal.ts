import useModalContext from "./useModalContext";

const useCloseModal = () => {
  const { closeModal } = useModalContext();

  return closeModal;
};

export default useCloseModal;
