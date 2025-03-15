import React from "react";
import EntryTimeline from "./EntryTimeline";

type Props = {
  result:
    | {
        message: string;
        success: boolean;
        description: string;
        action?: string;
        checkIn?: string;
        checkOut?: string;
      }
    | undefined;
};

const CheckInModal = ({ result }: Props) => {
  const { message, success, description, checkIn, checkOut } = result || {
    message: "",
    success: false,
    description: "",
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3
          className={
            success
              ? "font-bold text-lg text-success"
              : "font-bold text-lg text-error"
          }
        >
          {message}
        </h3>
        {checkIn && <EntryTimeline checkIn={checkIn} checkOut={checkOut} />}
        <p className="">{description}</p>
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
