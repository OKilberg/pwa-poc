import useFilter from "@/shared/queryState/useFilter";

const usePageTitle = () => {
  const { filter } = useFilter();

  const pageTitle = filter === "archived" ? "Logs [Archive]" : "Logs";

  return pageTitle;
};

export default usePageTitle;
