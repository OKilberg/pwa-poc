import useContext from "./useContext";

const useUser = () => {
  const context = useContext();

  const { user } = context;

  return user;
};

export default useUser;
