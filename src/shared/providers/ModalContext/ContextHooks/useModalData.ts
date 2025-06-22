import useModalContext from "./useModalContext";

const useModalData = () => {
  const { data: modalData } = useModalContext();

  return modalData;
};

export default useModalData;
