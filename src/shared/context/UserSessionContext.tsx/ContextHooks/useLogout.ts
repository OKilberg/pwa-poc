import useContext from "./useContext";

const useLogout = () => {
  const context = useContext();

  const { logout } = context;

  return logout;
};

export default useLogout;
