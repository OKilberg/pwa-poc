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
        <div className="w-1/3 my-auto">{leftChildren}</div>
        <div className="text-center">
          <h1 className="text-2xl">{pageTitle}</h1>
          {pageDescription && (
            <h2 className="text-lg text-gray-700 text-nowrap">
              {pageDescription}
            </h2>
          )}
        </div>
        <div className="w-1/3 my-auto">{rightChildren}</div>
      </div>
    </nav>
  );
};

export default CenterAppBar;
