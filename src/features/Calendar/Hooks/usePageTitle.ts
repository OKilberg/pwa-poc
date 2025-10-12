import useFilter from "@/shared/queryState/useFilter";

const usePageTitle = () => {
  const { filter } = useFilter();

  const pageTitle = filter ? "Calendar [Archive]" : "Calendar";

  return pageTitle;
};

export default usePageTitle;
