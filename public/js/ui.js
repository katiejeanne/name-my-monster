export function initCharCount(textarea, charCount, submitButton) {
  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} / 250`;
    submitButton.disabled = len === 0;
  });
}

export function showError(message) {
  const errorDiv = document.getElementById("error-message");
  if (errorDiv) errorDiv.textContent = message;
}

export function clearError() {
  showError("");
}

export function displayLatestResult(names) {
  const latest = document.getElementById("latestResult");
  latest.innerHTML = `<div class="d-flex justify-content-center">
        <div class="w-100" style="max-width: 600px;">
            <table class="table table-bordered table-hover mb-4">
            <thead class="table-primary">
                <tr>
                <th colspan="2" class="text-center fs-5">Your Monster's Suggested Names</th>
                </tr>
            </thead>
            <tbody>
                <tr><th>OpenAI</th><td>${names.openai}</td></tr>
                <tr><th>Claude</th><td>${names.claude}</td></tr>
                <tr><th>Mistral</th><td>${names.mistral}</td></tr>
            </tbody>
            </table>
        </div>
        </div>

        `;
}

export function displayResultsTable(entries) {
  const tbody = document.querySelector(`#results tbody`);
  tbody.innerHTML = "";
  entries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${entry.description}</td>
                <td>${entry.openai_name}</td>
                <td>${entry.claude_name}</td>
                <td>${entry.mistral_name}</td>
            `;
    tbody.appendChild(row);
  });
}

export function toggleForm(show) {
  document.getElementById("form-container").classList.toggle("d-none", !show);
  document.getElementById("lead-intro").classList.toggle("d-none", !show);
}

export function toggleResults(show) {
  document.getElementById("results").classList.toggle("d-none", !show);
}

export function toggleButtons({ showFormButton, showSkipButton }) {
  document
    .getElementById("show-form-button")
    .classList.toggle("d-none", !showFormButton);
  document
    .getElementById("skip-to-results-button")
    .classList.toggle("d-none", !showSkipButton);
}
