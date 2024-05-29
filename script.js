document
  .getElementById("p-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const textInput = document.getElementById("text-input").value;
    const errDiv = document.getElementById("error-msg");

    if (!textInput || textInput.length < 40 || textInput.length > 3000) {
      errDiv.textContent = "Please enter text between 40 and 3000 characters.";
      errDiv.style.display = "block";
      return;
    } else {
      errDiv.style.display = "none";
    }

    const url =
      "https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "12f231e37amshcebf6eb1a51b76cp144e29jsna1d2f968aafa",
        "x-rapidapi-host":
          "plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textInput,
        language: "en",
        includeCitations: false,
        scrapeSources: false,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const result = await response.json();
      display(result);
    } catch (error) {
      console.error("Error:", error);
    }
  });

function display(data) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  const percentange = document.createElement("p");
  percentange.textContent = `Percentage: ${data.percentPlagiarism}%`;
  results.appendChild(percentange);

  data.sources.forEach((source) => {
    const resultItem = document.createElement("div");
    resultItem.className = "result-item";

    const title = document.createElement("h2");
    title.textContent = source.title;
    resultItem.appendChild(title);

    const url = document.createElement("p");
    url.innerHTML = `Website URL: <a href="${source.url}" target="_blank">${source.url}</a>`;
    resultItem.appendChild(url);

    source.matches.forEach((match) => {
      const matchText = document.createElement("p");
      matchText.innerHTML = `Matched Text: <b>${match.matchText}</b>`;
      resultItem.appendChild(matchText);
    });

    results.appendChild(resultItem);
  });
}
