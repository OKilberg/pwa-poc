import { NewLogEntry } from "@/lib/dbTypes";

export const getModalProps = (
  message: string,
  success: boolean,
  description: string,
  action?: string,
  checkIn?: string,
  checkOut?: string
) => ({
  message,
  success,
  description,
  action,
  checkIn,
  checkOut,
});

export const showModal = () => {
  const modal = document.getElementById(
    "my_modal_1"
  ) as HTMLDialogElement | null;

  if (document && modal) {
    modal.showModal();
  }
};

export const showModalById = (id: string) => {
  const modal = document.getElementById(id) as HTMLDialogElement | null;

  if (document && modal) {
    modal.showModal();
  }
};

export const closeModalById = (id: string) => {
  const modal = document.getElementById(id) as HTMLDialogElement | null;

  if (document && modal) {
    modal.close();
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

export const getModalPropsCheckInSuccess = (
  firstName: string,
  checkIn: string
) => {
  const modalProps = getModalProps(
    `Welcome ${firstName}`,
    true,
    `Now get to work...`,
    "checkIn",
    checkIn
  );

  return modalProps;
};

export const getModalPropsCheckOutSuccess = (
  firstName: string,
  checkIn: string,
  checkOut: string
) => {
  const modalProps = getModalProps(
    `Goodbye ${firstName}`,
    true,
    `See you next time!`,
    "checkOut",
    checkIn,
    checkOut
  );

  return modalProps;
};

export const createCheckInEntry = (code: number) => {
  const newDate = new Date();
  const checkInEntry: NewLogEntry = {
    userId: code,
    inTime: newDate.toISOString(),
    outTime: null,
    month: newDate.getMonth(),
    year: newDate.getFullYear(),
    note: null,
  };

  return checkInEntry;
};
