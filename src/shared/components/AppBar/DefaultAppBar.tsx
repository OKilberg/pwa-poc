import Logo from "../Logo";
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
      <div>
        <Logo
          style={{
            textShadow:
              "1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 0px 0px black, 0px -1px 0px black, -1px 0px 0px black",
          }}
        />
      </div>
      <div className="size-6"></div>
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
