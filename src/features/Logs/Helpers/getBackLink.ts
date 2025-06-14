const getBackLink = (employee: number, month: number) => {
  const backLink = `/admin/logs?month=${month}&employee=${employee}`;

  return backLink;
};

export default getBackLink;
