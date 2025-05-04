import { AppBarProps } from "./AppBar";

const CenterAppBar = ({
  pageTitle,
  leftChildren,
  rightChildren,
}: AppBarProps) => {
  return (
    <nav className="min-h-16 border-2 border-red-500 px-4 flex flex-col pt-5 pb-6">
      <div className="flex justify-between h-16">
        {leftChildren}
        <h1 className="text-2xl">{pageTitle}</h1>
        {rightChildren}
      </div>
    </nav>
  );
};

export default CenterAppBar;
