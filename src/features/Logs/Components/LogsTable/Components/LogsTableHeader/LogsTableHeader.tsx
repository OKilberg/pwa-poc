const LogsTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Type</th>
        <th className="text-center">Start Time</th>
        <th className="text-center">End Time</th>
        <th className="text-center">Duration</th>
        <th className="text-center">Note</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default LogsTableHeader;
