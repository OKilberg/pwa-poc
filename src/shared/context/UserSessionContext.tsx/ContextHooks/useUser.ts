import useContext from "./useContext";

const useUser = () => {
  const context = useContext();

  if (!context) {
    return null;
  }

  const { user } = context;

  return user;
};

export default useUser;
