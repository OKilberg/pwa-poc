import { User } from "../dbTypes";

export type UserWithAdditionalProps =
  | (User & {
      isClockedIn: true;
      inTime: string;
      entryId: number;
    })
  | (User & { isClockedIn: false });

export const startUserSession = (user: UserWithAdditionalProps) => {
  const userString = JSON.stringify(user);
  sessionStorage.setItem("userSession", userString);
};

export const getUserSession = () => {
  if (typeof window === "undefined") return null;

  const userSession = sessionStorage.getItem("userSession");
  if (userSession) {
    const user: UserWithAdditionalProps = JSON.parse(userSession);

    return user;
  }

  return null;
};

export const clearUserSession = () => {
  sessionStorage.removeItem("userSession");
};
