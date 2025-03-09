export const getInputElement = (id: string) => {
  const inputElement = document.getElementById(id) as HTMLInputElement | null;

  return inputElement;
};

export const getHasOneValue = (input: HTMLInputElement) => {
  const { value } = input;

  const hasOneValue = value.length === 1;

  return hasOneValue;
};

export const getNextInputId = (input: HTMLInputElement) => {
  const nextInputId = input.dataset.focusInputNext;

  return nextInputId;
};
