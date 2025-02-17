"use client";

import React, { useEffect, useState } from "react";
import { db } from "../db";

type Entry = {
  id: string;
  code: number;
  in: string; // ISO-like datetime string
  out: string; // ISO-like datetime string
};

const fetchEntries = async () => {
  const fetchUrl = "http://localhost:3001/entries";
  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error(`Error fetching ${fetchUrl}`);
  }

  const entries: Array<Entry> = await response.json();

  return entries;
};

const Entries = () => {
  const [stateEntries, setStateEntries] = useState<Array<Entry>>([]);

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
      }
    };

    loadData();
  }, []);

  return (
    <div>
      Entries
      {stateEntries.map((entry) => (
        <div key={entry.id}>{JSON.stringify(entry)}</div>
      ))}
    </div>
  );
};

export default Entries;
