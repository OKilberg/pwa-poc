import { TimePicker } from '@mui/x-date-pickers'
import React from 'react'

type Props = {}

const EditLogModal = (props: Props) => {
  return (
    <dialog id="edit_log_modal" className="modal">
      <div className="modal-box">
        <h3>
          "Edit"
        </h3>
        <p className="">InTime</p>
        <p className="">OutTime</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary">Done</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default EditLogModal