const LogsTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Type</th>
        <th className="text-center">Date(s)</th>
        <th className="text-center">In-Out</th>
        <th className="text-center">Duration</th>
        <th className="text-center">Note</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default LogsTableHeader;
