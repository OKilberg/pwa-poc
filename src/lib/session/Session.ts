import { User } from "../dbTypes";

export const startUserSession = (user: User) => {
  const userString = JSON.stringify(user);
  sessionStorage.setItem("userSession", userString);
};

export const getUserSession = () => {
  const userSession = sessionStorage.getItem("userSession");
  if (userSession) {
    const user: User = JSON.parse(userSession);

    return user;
  }

  return null;
};

export const clearUserSession = () => {
  sessionStorage.removeItem("userSession");
};
