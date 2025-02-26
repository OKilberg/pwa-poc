"use client";

import React, { useEffect, useState } from "react";
import Entry from "./Entry";
import { getLogEntries } from "@/lib/db/logs";
import { LogEntry } from "@/lib/dbTypes";

const EntryTableBody = () => {
  const [stateEntries, setStateEntries] = useState<Array<LogEntry>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const logEntries = await getLogEntries();

      setStateEntries(logEntries);

      /*
      const entries = await getEntries();

      if (entries.length > 0) {
        setStateEntries(entries);
        console.log("Successful fetch, using server data...");
      }
      */
    };

    loadData();
  }, []);

  useEffect(() => {
    if (stateEntries.length > 0) {
      setIsLoading(false);
    }
  }, [stateEntries]);

  if (isLoading)
    return (
      <tbody>
        <tr>
          <th>
            <span className="loading loading-spinner loading-md text-secondary"></span>
          </th>
        </tr>
      </tbody>
    );

  return (
    <tbody>
      {stateEntries.map((logEntry) => (
        <Entry key={logEntry.id} logEntry={logEntry} />
      ))}
    </tbody>
  );
};

export default EntryTableBody;
