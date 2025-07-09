import { usePathname } from "next/navigation";

const hideTopbarRoutes = ["/admin", "/clockin/attendance"];

const useShowTopbar = () => {
  const pathname = usePathname();

  const shouldHide = hideTopbarRoutes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  const showTopbar = !shouldHide;

  return showTopbar;
};

export default useShowTopbar;
