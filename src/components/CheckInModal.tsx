import React from "react";

type Props = {
  result:
    | { message: string; success: boolean; description: string }
    | undefined;
};

const CheckInModal = ({ result }: Props) => {
  const { message, success, description } = result || {
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
        <p className="py-4">{description}</p>
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
