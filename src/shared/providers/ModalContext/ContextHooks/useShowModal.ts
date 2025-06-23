import useModalContext from "./useModalContext";

const useShowModal = () => {
  const { showModal } = useModalContext();

  return showModal;
};

export default useShowModal;
