const textarea = document.getElementById("prompt");
const charCount = document.getElementById("char-count");

textarea.addEventListener("input", () => {
  const currentLength = textarea.value.length;
  charCount.textContent = `${currentLength} / 250`;
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
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  });
