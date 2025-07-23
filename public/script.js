const textarea = document.getElementById("prompt");
const charCount = document.getElementById("char-count");
const submitButton = document.getElementById("submit-button");
const showFormBtn = document.getElementById("show-form-button");
const skipToResultsBtn = document.getElementById("skip-to-results-button");

function showSubmitAnotherButton() {
  showFormBtn.classList.remove("d-none");
  skipToResultsBtn.classList.add("d-none");
}

function showSkipToResultsButton() {
  skipToResultsBtn.classList.remove("d-none");
  showFormBtn.classList.add("d-none");
}

textarea.addEventListener("input", () => {
  const currentLength = textarea.value.length;
  charCount.textContent = `${currentLength} / 250`;
  submitButton.disabled = currentLength === 0;
});

document
  .getElementById("monster-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const description = textarea.value.trim();

    if (description.length === 0) {
      alert("Please describe your monster before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/name-monster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      console.log("Response from server: ", data);

      const { openai, claude, mistral } = data.names;

      // Inject latest result
      const latest = document.getElementById("latestResult");
      latest.innerHTML = `
        <div class="d-flex justify-content-center">
        <div class="w-100" style="max-width: 600px;">
            <table class="table table-bordered table-hover mb-4">
            <thead class="table-primary">
                <tr>
                <th colspan="2" class="text-center fs-5">Your Monster's Suggested Names</th>
                </tr>
            </thead>
            <tbody>
                <tr><th>OpenAI</th><td>${openai}</td></tr>
                <tr><th>Claude</th><td>${claude}</td></tr>
                <tr><th>Mistral</th><td>${mistral}</td></tr>
            </tbody>
            </table>
        </div>
        </div>

        `;

      // Reveal results
      document.getElementById("results").classList.remove("d-none");

      // Clear the form
      textarea.value = "";
      charCount.textContent = "0 / 250";
      submitButton.disabled = true;

      // Hide the form
      document.getElementById("form-container").classList.add("d-none");
      document.getElementById("lead-intro").classList.add("d-none");

      await loadPastResults();
      showSubmitAnotherButton();
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  });

async function loadPastResults() {
  try {
    const res = await fetch("/api/allResults");
    const data = await res.json();

    const tableBody = document.querySelector("#results tbody");
    tableBody.innerHTML = "";

    data.results.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${entry.description}</td>
                <td>${entry.openai_name}</td>
                <td>${entry.claude_name}</td>
                <td>${entry.mistral_name}</td>
            `;
      tableBody.appendChild(row);
    });

    document.getElementById("results").classList.remove("d-none");
  } catch (error) {
    console.error("Error loading  past results:", error);
  }
}

// Show form button behavior
showFormBtn.addEventListener("click", () => {
  document.getElementById("form-container").classList.remove("d-none");
  document.getElementById("lead-intro").classList.remove("d-none");
  document.getElementById("results").classList.add("d-none");
  document.getElementById("latestResult").innerHTML = "";

  showSkipToResultsButton();

  textarea.value = "";
  submitButton.disabled = true;
  charCount.textContent = "0 / 250";
});

// Skip-to-results button behavior
skipToResultsBtn.addEventListener("click", () => {
  document.getElementById("form-container").classList.add("d-none");
  document.getElementById("lead-intro").classList.add("d-none");
  document.getElementById("results").classList.remove("d-none");
  document.getElementById("latestResult").innerHTML = "";

  showSubmitAnotherButton();
  loadPastResults();
});

showSkipToResultsButton();
