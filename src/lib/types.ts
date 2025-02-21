export type EntryItem = {
  code: number;
  id: string;
  in: string; // ISO-like datetime string
  out: string | null; // ISO-like datetime string
};

export type EntryItemNoId = Omit<EntryItem, "id">;

export type EntryItems = Array<EntryItem>;
