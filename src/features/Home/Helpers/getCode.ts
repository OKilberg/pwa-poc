const getCode = (formData: FormData) => {
  const number1 = formData.get("code-1");
  const number2 = formData.get("code-2");
  const number3 = formData.get("code-3");

  const code = Number(`${number1}${number2}${number3}`);

  return code;
};

export default getCode;
