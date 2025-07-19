const textarea = document.getElementById("prompt");
const charCount = document.getElementById("char-count");
const submitButton = document.getElementById("submit-button");

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
    <h4 class="fw-bold text-center">Your names:</h4>
    <ul class="list-unstyled text-center">
      <li><strong>OpenAI:</strong> ${openai}</li>
      <li><strong>Claude:</strong> ${claude}</li>
      <li><strong>Mistral:</strong> ${mistral}</li>
    </ul>
  `;
      // Reveal results
      document.getElementById("results").classList.remove("d-none");

      // Hide the form
      document.getElementById("form-container").classList.add("d-none");
      document.getElementById("lead-intro").classList.add("d-none");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  });
