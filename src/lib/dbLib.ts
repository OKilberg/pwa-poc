import { db } from "@/app/db";
import { EntryItem, EntryItemNoId } from "./types";
const TABLE_POSTS = "posts";

const addLocalData = async <T>(table: string, data: T) => {
  try {
    const id = await db.table(table).add(data);

    return !!id;
  } catch (error) {
    console.log("Error inserting post: ", error);

    return false;
  }
};

const getLocalData = async <T>(table: string) => {
  try {
    const localEntries: Array<T> = await db.table(table).toArray();

    return localEntries;
  } catch (error) {
    console.log("Error getting local entries: ", error);

    return [];
  }
};

export const insertLocalEntry = async (data: EntryItemNoId) => {
  const result = await addLocalData<EntryItemNoId>(TABLE_POSTS, data);

  return result;
};

export const getLocalEntries = async () => {
  const localEntries = await getLocalData<EntryItem>(TABLE_POSTS);

  return localEntries;
};

export const getLocalUser = async (code: number) => {
  try {
    const user = await db.table("users").where("code").equals(code).first();
    if (user) {
      return user;
    }

    throw new Error(`No user found with code: ${code}`);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getLocalUserLatestCheckin = async (code: number) => {
  try {
    const entries = await db
      .table(TABLE_POSTS)
      .where("code")
      .equals(code)
      .and((entry) => !entry.out)
      .reverse()
      .sortBy("in");
    if (entries.length > 0) {
      return entries[0];
    }

    throw new Error(`No entry found for user with code: ${code}`);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateLocalEntry = async (id: number, changes: any) => {
  try {
    const res = await db.table(TABLE_POSTS).update(id, changes);

    return !!res;
  } catch (error) {
    console.log("Error updating post: ", error);

    return false;
  }
};
