import {
  getLocalUser,
  getLocalUserLatestCheckin,
  insertLocalEntry,
  updateLocalEntry,
} from "@/lib/dbLib";
import { postEntry } from "@/lib/serverLib";
import {
  getModalPropsNoCodeMatch,
  showModal,
  getModalPropsCheckInError,
  getModalPropsCheckInSuccess,
  getModalPropsCheckOutSuccess,
  createCheckInEntry,
} from "./helpers";

export const submitCodeAction = async (
  _prevData: unknown,
  formData: FormData
) => {
  const number1 = formData.get("code-1");
  const number2 = formData.get("code-2");
  const number3 = formData.get("code-3");
  const code = Number(`${number1}${number2}${number3}`);

  const user = await getLocalUser(code);
  const codeMatchExists = !!user;

  if (!codeMatchExists) {
    const modalPropsNoCodeMatch = getModalPropsNoCodeMatch(code);

    showModal();

    return modalPropsNoCodeMatch;
  }

  const latestCheckin = await getLocalUserLatestCheckin(code);
  const hasCheckedIn = latestCheckin;

  const checkInEntry = createCheckInEntry(code);

  if (!hasCheckedIn) {
    const inserted = await insertLocalEntry(checkInEntry);

    if (!inserted) {
      const modalPropsCheckInError = getModalPropsCheckInError(code);

      showModal();

      return modalPropsCheckInError;
    }

    postEntry(checkInEntry); // No need to await

    const modalPropsCheckInSuccess = getModalPropsCheckInSuccess(
      user.firstname,
      checkInEntry.in
    );

    showModal();

    return modalPropsCheckInSuccess;
  }

  if (hasCheckedIn) {
    const { id, in: inTime } = latestCheckin;

    const entryChanges = {
      out: new Date().toISOString(),
    };

    const update = await updateLocalEntry(id, entryChanges);
    // TODO: server update

    const modalPropsCheckOutSuccess = getModalPropsCheckOutSuccess(
      user.firstname,
      inTime,
      entryChanges.out
    );

    showModal();

    return modalPropsCheckOutSuccess;
  }
};
