import React, { useRef } from "react";
import AddAdminForm from "./AddAdminForm";

const CreateAdminModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <dialog ref={modalRef} id="create_admin_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Create an admin user</p>
        <div className="modal-action"></div>
        <AddAdminForm />
      </div>
    </dialog>
  );
};

export default CreateAdminModal;
