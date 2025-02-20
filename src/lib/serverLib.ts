import { EntryItem } from "@/app/entries/page";

const ENTRY_URL = "http://localhost:3001/entries";

export const postEntry = async (data: Omit<EntryItem, "id">) => {
  try {
    const response = await fetch(ENTRY_URL, {
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

export const getEntries = async () => {
  try {
    const response = await fetch(ENTRY_URL);

    if (!response.ok) {
      throw new Error(`Server response was not ok. ${ENTRY_URL}`);
    }

    const entries: Array<EntryItem> = await response.json();

    return entries;
  } catch (error) {
    console.log("Error, could not fetch:", error);

    return [];
  }
};
