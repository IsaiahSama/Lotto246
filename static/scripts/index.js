const changePage = (key) => {
  currentPage = PAGES[key];
  document.getElementById("target").innerHTML = currentPage;
};

const requestUpdate = () => {
  values = getFormValues();
  updateFields(values);
};
