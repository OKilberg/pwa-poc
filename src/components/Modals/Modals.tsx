import ConfirmLogDeletionModal from "./Components/ConfirmLogDeletionModal/ConfirmLogDeletionModal";

/** Parent modal component. Should be position at the top of the app hierarchy, below the ModalContext */
const Modals = () => {
  return (
    <>
      <ConfirmLogDeletionModal />
      {/* Add modal components here */}
    </>
  );
};

export default Modals;
