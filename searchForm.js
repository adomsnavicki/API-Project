export function createSearchFrom() {
  const searchForm = document.createElement("form");
  searchForm.classList.add("search-form");
  searchForm.action = "./search.html";
  const searchFormInput = document.createElement("input");
  searchFormInput.setAttribute("type", "text");
  searchFormInput.setAttribute("name", "q");
  searchFormInput.setAttribute("placeholder", "search...");
  const submitButton = document.createElement("button");
  submitButton.textContent = "search";
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Submit");

  searchForm.append(searchFormInput, submitButton);
  return searchForm;
}
