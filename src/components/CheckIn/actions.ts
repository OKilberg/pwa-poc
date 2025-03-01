import {
  getModalPropsNoCodeMatch,
  showModal,
  getModalPropsCheckInError,
  getModalPropsCheckInSuccess,
  getModalPropsCheckOutSuccess,
  createCheckInEntry,
} from "./helpers";
import { getUser } from "@/lib/db/users";
import { addLogEntry, editLogEntry, getLatestLogEntry } from "@/lib/db/logs";

const getCode = (formData: FormData) => {
  const number1 = formData.get("code-1");
  const number2 = formData.get("code-2");
  const number3 = formData.get("code-3");

  const code = Number(`${number1}${number2}${number3}`);

  return code;
};

export const submitCodeAction = async (
  _prevData: unknown,
  formData: FormData
) => {
  const code = getCode(formData);

  const user = await getUser(code);
  const codeMatchExists = !!user;

  if (!codeMatchExists) {
    const modalPropsNoCodeMatch = getModalPropsNoCodeMatch(code);

    showModal();

    return modalPropsNoCodeMatch;
  }

  const latestCheckin = await getLatestLogEntry(code);
  const hasCheckedIn = !!latestCheckin;

  const checkInEntry = createCheckInEntry(code);

  if (!hasCheckedIn) {
    const added = await addLogEntry(checkInEntry);

    if (!added) {
      const modalPropsCheckInError = getModalPropsCheckInError(code);

      showModal();

      return modalPropsCheckInError;
    }

    // postEntry(checkInEntry); // No need to await

    const modalPropsCheckInSuccess = getModalPropsCheckInSuccess(
      user.firstName,
      checkInEntry.inTime
    );

    showModal();

    return modalPropsCheckInSuccess;
  }

  const { id, inTime } = latestCheckin;

  const entryChanges = {
    outTime: new Date().toISOString(),
  };

  await editLogEntry(id, entryChanges);
  // TODO: server update

  const modalPropsCheckOutSuccess = getModalPropsCheckOutSuccess(
    user.firstName,
    inTime,
    entryChanges.outTime
  );

  showModal();

  return modalPropsCheckOutSuccess;
};
