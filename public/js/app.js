import { nameMonster, getAllResults } from "./api.js";
import {
  initCharCount,
  showError,
  clearError,
  displayLatestResult,
  clearLatestResult,
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

      document.getElementById("loading").classList.remove("d-none");
      toggleForm(false);
      toggleButtons({ showFormButton: false, showSkipButton: false });

      try {
        const data = await nameMonster(description);

        if (!data.success) {
          showError(data.error || "Something went wrong. Please try again.");
          toggleForm(true);
          toggleButtons({ showFormButton: false, showSkipButton: true });
          return;
        }

        displayLatestResult(data.names);
        toggleResults(true);
        toggleButtons({ showFormButton: true, showSkipButton: false });

        textarea.value = "";
        charCount.textContent = "0 / 250";
        submitButton.disabled = true;

        const allData = await getAllResults();
        displayResultsTable(allData.results);
      } catch (error) {
        showError("Something went wrong. Please try again.");
        toggleForm(true);
        toggleButtons({ showFormButton: false, showSkipButton: true });
      } finally {
        document.getElementById("loading").classList.add("d-none");
      }
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
    clearLatestResult();
  });

  toggleResults(false);
  toggleButtons({ showFormButton: false, showSkipButton: true });
});
