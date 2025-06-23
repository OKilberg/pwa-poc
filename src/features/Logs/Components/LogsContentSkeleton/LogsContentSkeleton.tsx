const LogsContentSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3 pt-4">
      <div className="flex gap-2 pb-2">
        <div className="skeleton h-12 w-full"></div>
        <div className="skeleton h-12 w-full"></div>
        <div className="skeleton h-12 w-full"></div>
      </div>
      <div className="skeleton h-8 w-full"></div>
      <div className="skeleton h-8 w-full"></div>
      <div className="skeleton h-8 w-full"></div>
      <div className="skeleton h-8 w-full"></div>
    </div>
  );
};

export default LogsContentSkeleton;
