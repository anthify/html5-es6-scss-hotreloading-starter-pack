import text from "./text";

const textarea = document.getElementById("textarea");
textarea.value = text;
textarea.style.height = `${textarea.scrollHeight}px`;

const editButton = document.querySelector(".c-edit-btn");
const saveButton = document.querySelector(".c-save-btn");
const sidebar = document.querySelector(".sidebar-img");
const sidebarEdit = document.querySelector(".sidebar-img--edit");

editButton.addEventListener("click", () => {
  textarea.disabled = false;
  editButton.classList.add("hide");
  saveButton.classList.remove("hide");
  sidebar.classList.add("hide");
  sidebarEdit.classList.remove("hide");
});

saveButton.addEventListener("click", () => {
  textarea.disabled = true;
  editButton.classList.remove("hide");
  saveButton.classList.add("hide");
  sidebarEdit.classList.add("hide");
  sidebar.classList.remove("hide");
});

sidebarEdit.addEventListener("click", () => {
  textarea.disabled = true;
  editButton.classList.remove("hide");
  saveButton.classList.add("hide");
  sidebarEdit.classList.add("hide");
  sidebar.classList.remove("hide");
});
