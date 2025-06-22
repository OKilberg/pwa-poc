const showModalById = (id: string) => {
  const modal = document.getElementById(id) as HTMLDialogElement | null;

  if (document && modal) {
    modal.showModal();
  }
};

export default showModalById;


