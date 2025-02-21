import { EntryItemNoId, EntryItems } from "./types";

const ENTRY_URL = "http://localhost:3001/entries";

const post = async (data: unknown, url: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Server response was not ok.");
    }

    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.log("Error, not possible to post to server.");

    return null;
  }
};

const get = async <T>(url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Server response was not ok. ${url}`);
    }

    const entries: T = await response.json();

    return entries;
  } catch (error) {
    console.log("Error, could not fetch:", error);

    return [];
  }
};

export const postEntry = async (data: EntryItemNoId) => {
  const result = post(data, ENTRY_URL);

  return result;
};

export const getEntries = async () => {
  const result = await get<EntryItems>(ENTRY_URL);

  return result;
};
