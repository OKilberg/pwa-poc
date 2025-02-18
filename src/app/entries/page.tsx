import EntryTableBody from "@/components/EntryTableBody";
import React from "react";

export type EntryItem = {
  id: string;
  code: number;
  in: string; // ISO-like datetime string
  out: string; // ISO-like datetime string
};

const Entries = () => {
  return (
    <div className="overflow-x-auto flex justify-center">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Entries</h1>
          <table className="table table-md prose">
            <thead>
              <tr>
                <th>Code</th>
                <th>In</th>
                <th>Out</th>
                <th>Total</th>
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
