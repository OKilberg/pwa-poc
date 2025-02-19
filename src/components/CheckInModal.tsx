import React from "react";

type Props = {};

const CheckInModal = (props: Props) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-success">Check-In Successful!</h3>
        <p className="py-4">Now get to work...</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary">Done</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CheckInModal;
