import React from "react";

const EditLogModal = () => {
  return (
    <dialog id="edit_log_modal" className="modal">
      <div className="modal-box">
        <h3>Edit</h3>
        <p className="">InTime</p>
        <p className="">OutTime</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary">Done</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditLogModal;
