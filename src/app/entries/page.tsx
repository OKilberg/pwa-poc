import EntryTableBody from "@/components/EntryTableBody";
import React from "react";

const Entries = () => {
  return (
    <div className="overflow-x-auto flex justify-center max-h-[90vh] bg-tresLight rounded-md">
      <div className="card flex-1">
        <div className="card-body">
          <h1 className="card-title">Log</h1>
          <table className="table table-md prose overflow-y-scroll prose flex flex-col h-full">
            <thead className="">
              <tr className="">
                <th className="">Code</th>
                <th className="">In</th>
                <th className="">Out</th>
                <th className="">Total</th>
              </tr>
            </thead>
            <EntryTableBody />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Entries;
