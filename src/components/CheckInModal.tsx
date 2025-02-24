import { getCurrentTime } from "@/util/util";
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
  const { message, success, description, action, checkIn, checkOut } =
    result || {
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

const CheckInOutInfo = () => {
  return (
    <div className="flex flex-col">
      <div className="stats">
        <div className="stat">
          <div className="stat-title">Checked In</div>
          <div className="stat-value text-success">{getCurrentTime()}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="stat-title">Checked Out</div>
          <div className="stat-value">--</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
