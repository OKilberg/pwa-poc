"use client";

import { db } from "@/app/db";
import { EntryItem } from "@/app/entries/page";
import React, { useEffect, useState } from "react";
import Entry from "./Entry";

const fetchEntries = async () => {
  const fetchUrl = "http://localhost:3001/entries";
  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error(`Error fetching ${fetchUrl}`);
  }

  const entries: Array<EntryItem> = await response.json();

  return entries;
};

const EntryTableBody = () => {
  const [stateEntries, setStateEntries] = useState<Array<EntryItem>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const localData = await db.table("posts").toArray();

      setStateEntries(localData);

      try {
        const entries = await fetchEntries();

        console.log("Successful fetch, using server data...");

        setStateEntries(entries);
      } catch (error) {
        console.log("Error fetching, using local cache... Error:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    loadData();
  }, []);

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
