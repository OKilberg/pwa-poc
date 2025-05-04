import { useQueryState } from "nuqs";

const useEmployee = () => {
  const [employee, setEmployee] = useQueryState("employee");

  return { employee, setEmployee };
};

export default useEmployee;
