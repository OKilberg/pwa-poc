import { EntryItemNoId } from "@/lib/types";

export const getModalProps = (
  message: string,
  success: boolean,
  description: string
) => ({
  message,
  success,
  description,
});

export const showModal = () => {
  const modal = document.getElementById(
    "my_modal_1"
  ) as HTMLDialogElement | null;

  if (document && modal) {
    modal.showModal();
  }
};

export const getModalPropsNoCodeMatch = (code: number) => {
  const modalProps = getModalProps(
    `No user with code ${code} exists.`,
    false,
    `Are you sure you entered the correct code?`
  );

  return modalProps;
};

export const getModalPropsCheckInError = (code: number) => {
  const modalProps = getModalProps(
    `Failed to check in user with code ${code}.`,
    false,
    `Please try again. Contact an admin if the issue persists.`
  );

  return modalProps;
};

export const getModalPropsCheckInSuccess = (firstName: string) => {
  const modalProps = getModalProps(
    `Welcome ${firstName}`,
    true,
    `Now get to work...`
  );

  return modalProps;
};

export const getModalPropsCheckOutSuccess = (firstName: string) => {
  const modalProps = getModalProps(
    `Goodbye ${firstName}`,
    true,
    `See you next time!`
  );

  return modalProps;
};

export const createCheckInEntry = (code: number) => {
  const checkInEntry: EntryItemNoId = {
    code,
    in: new Date().toISOString(),
    out: null,
  };

  return checkInEntry;
};
