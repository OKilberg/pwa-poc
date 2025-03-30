import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "es";

  // const localeES = "es";

  // const enMessages = (await import(`../../messages/${locale}.json`)).default;
  // const esMessages = (await import(`../../messages/${localeES}.json`)).default;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
