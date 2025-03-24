import { NewLogEntry } from "@/lib/dbTypes";

const getNewCheckInEntry = (id: NewLogEntry["userId"]) => {
  const checkInDate = new Date();
  const inTime = checkInDate.toISOString();
  const month = checkInDate.getMonth();
  const year = checkInDate.getFullYear();

  const checkInEntry: NewLogEntry = {
    userId: id,
    inTime,
    outTime: null,
    month,
    year,
    note: null,
  };

  return checkInEntry;
};

export default getNewCheckInEntry;
