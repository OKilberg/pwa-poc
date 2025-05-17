import AppBar, { AppBarProps } from "./AppBar";
import AppBarActions from "./Subcomponents/AppBarActions";
import AppBarBack from "./Subcomponents/AppBarBack";

type DefaultAppBarProps = Pick<AppBarProps, "pageTitle" | "pageDescription">;

const DefaultAppBar = ({ pageTitle, pageDescription }: DefaultAppBarProps) => {
  const LeftAppBarChildren = (
    <AppBarActions>
      <AppBarBack />
    </AppBarActions>
  );

  return (
    <AppBar
      leftChildren={LeftAppBarChildren}
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    />
  );
};

export default DefaultAppBar;
