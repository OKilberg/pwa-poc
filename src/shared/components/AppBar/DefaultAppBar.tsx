import AppBar, { AppBarProps } from "./AppBar";
import AppBarActions from "./Subcomponents/AppBarActions";
import AppBarBack, { AppBarBackProps } from "./Subcomponents/AppBarBack";

type DefaultAppBarProps = Pick<AppBarProps, "pageTitle" | "pageDescription"> &
  Pick<AppBarBackProps, "url">;

const DefaultAppBar = ({
  pageTitle,
  pageDescription,
  url,
}: DefaultAppBarProps) => {
  const LeftAppBarChildren = (
    <AppBarActions>
      <AppBarBack url={url} />
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
