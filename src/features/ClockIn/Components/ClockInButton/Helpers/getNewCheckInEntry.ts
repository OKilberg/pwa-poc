import { NewLogEntry } from "@/lib/dbTypes";

const getNewCheckInEntry = (id: NewLogEntry["userId"]) => {
  const checkInEntry: NewLogEntry = {
    userId: id,
    inTime: new Date().toISOString(),
    outTime: null,
  };

  return checkInEntry;
};

export default getNewCheckInEntry;
