const changePage = (key) => {
  currentPage = PAGES[key];
};

const requestUpdate = () => {
  values = getFormValues();
  updateFields(values);
};
