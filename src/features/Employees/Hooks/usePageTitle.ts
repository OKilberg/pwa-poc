import useFilter from "@/shared/queryState/useFilter";

const usePageTitle = () => {
  const { filter } = useFilter();

  const pageTitle = filter === "archived" ? "Employees [Archive]" : "Employees";

  return pageTitle;
};

export default usePageTitle;
