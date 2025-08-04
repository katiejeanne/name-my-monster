import { nameMonster, getAllResults } from "./api.js";
import {
  initCharCount,
  showError,
  clearError,
  displayLatestResult,
  displayResultsTable,
  toggleForm,
  toggleResults,
  toggleButtons,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("prompt");
  const charCount = document.getElementById("char-count");
  const submitButton = document.getElementById("submit-button");

  initCharCount(textarea, charCount, submitButton);

  document
    .getElementById("monster-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      clearError();
      const description = textarea.value.trim();
      if (!description) {
        showError("Please describe your monster before submitting.");
        return;
      }

      const data = await nameMonster(description);
      if (!data.success) {
        showError(data.error || "Something went wrong. Please try again.");
        return;
      }

      displayLatestResult(data.names);
      toggleResults(true);
      toggleForm(false);
      toggleButtons({ showFormButton: true, showSkipButton: false });

      textarea.value = "";
      charCount.textContent = "0 / 250";
      submitButton.disabled = true;

      const allData = await getAllResults();
      displayResultsTable(allData.results);
    });

  document
    .getElementById("skip-to-results-button")
    .addEventListener("click", async () => {
      clearError();
      toggleForm(false);
      toggleResults(true);
      toggleButtons({ showFormButton: true, showSkipButton: false });
      const allData = await getAllResults();
      displayResultsTable(allData.results);
    });

  document.getElementById("show-form-button").addEventListener("click", () => {
    clearError();
    toggleForm(true);
    toggleResults(false);
    toggleButtons({ showFormButton: false, showSkipButton: true });

    textarea.value = "";
    charCount.textContent = "0 / 250";
    submitButton.disabled = true;
  });

  toggleResults(false);
  toggleButtons({ showFormButton: false, showSkipButton: true });
});
