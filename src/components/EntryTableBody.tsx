"use client";

import { EntryItem } from "@/app/entries/page";
import React, { useEffect, useState } from "react";
import Entry from "./Entry";
import { getEntries } from "@/lib/serverLib";
import { getLocalEntries } from "@/lib/dbLib";

const EntryTableBody = () => {
  const [stateEntries, setStateEntries] = useState<Array<EntryItem>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const localData = await getLocalEntries();

      setStateEntries(localData);

      const entries = await getEntries();

      console.log("Successful fetch, using server data...");

      setStateEntries(entries);
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
      {stateEntries.map((entry) => (
        <Entry key={entry.id} entryItem={entry} />
      ))}
    </tbody>
  );
};

export default EntryTableBody;
