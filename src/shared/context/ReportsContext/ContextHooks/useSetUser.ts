import useContext from "./useContext";

const useSetUser = () => {
  const context = useContext();

  const { setUser } = context;

  return setUser;
};

export default useSetUser;
