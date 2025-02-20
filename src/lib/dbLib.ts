import { db } from "@/app/db";
import { EntryItem } from "@/app/entries/page";
const TABLE_POSTS = "posts";

export const insertLocalEntry = async (data: Omit<EntryItem, "id">) => {
  try {
    const id = await db.table(TABLE_POSTS).add(data);

    return !!id;
  } catch (error) {
    console.log("Error inserting post: ", error);

    return false;
  }
};

export const getLocalEntries = async () => {
  try {
    const localEntries = await db.table("posts").toArray();

    return localEntries;
  } catch (error) {
    console.log("Error getting local entries: ", error);

    return [];
  }
};
