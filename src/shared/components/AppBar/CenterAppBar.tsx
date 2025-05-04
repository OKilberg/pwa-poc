import { AppBarProps } from "./AppBar";

const CenterAppBar = ({
  pageTitle,
  pageDescription,
  leftChildren,
  rightChildren,
}: AppBarProps) => {
  return (
    <nav className="min-h-16 px-4 flex flex-col pt-5 pb-6">
      <div className="flex justify-between h-16">
        {leftChildren}
        <div className="text-center">
          <h1 className="text-2xl">{pageTitle}</h1>
          {pageDescription && (
            <h2 className="text-lg text-gray-700">{pageDescription}</h2>
          )}
        </div>
        {rightChildren}
      </div>
    </nav>
  );
};

export default CenterAppBar;
