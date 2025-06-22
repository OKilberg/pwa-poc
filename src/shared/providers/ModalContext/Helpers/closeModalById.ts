const closeModalById = (id: string) => {
  const modal = document.getElementById(id) as HTMLDialogElement | null;

  if (document && modal) {
    modal.close();
  }
};

export default closeModalById;
