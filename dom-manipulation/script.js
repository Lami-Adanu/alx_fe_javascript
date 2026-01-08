// Load saved quotes from localStorage
const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
if (storedQuotes.length > 0) {
    quotes.push(...storedQuotes);
}

// Optional: store last viewed quote in sessionStorage
let lastQuoteIndex = sessionStorage.getItem("lastQuoteIndex") || null;

// ===== Quotes Array =====
const quotes = [
  { text: "Thank YOU LORD", category: "Faith" },
  { text: "Consistency beats motivation.", category: "Motivation" },
  { text: "Start small, grow daily.", category: "Life" }
];

// ===== DOM Containers =====
const quoteContainer = document.getElementById("quote-container");

// ===== Function: Show Random Quote =====
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteContainer.innerHTML = `
      <p>"${quote.text}"</p>
      <small>Category: ${quote.category}</small>
    `;

    // Save last viewed quote index in sessionStorage
    sessionStorage.setItem("lastQuoteIndex", randomIndex);
}

// ===== Function: Add Quote (called by HTML button) =====
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (!quoteText || !quoteCategory) {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);

  // Save quotes to localStorage
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

const exportBtn = document.getElementById("exportBtn");

exportBtn.addEventListener("click", function() {
    const dataStr = JSON.stringify(quotes, null, 2); // nice formatting
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();

    URL.revokeObjectURL(url);
});

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    console.log(fileReader)
    fileReader.onload = function (event) {
     const importedQuotes = JSON.parse(event.target.result);
    quotesArray.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}