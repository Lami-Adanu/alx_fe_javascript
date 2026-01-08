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
  // Pick a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Update DOM with the quote
  quoteContainer.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
}

// ===== Function: Add Quote (called by HTML button) =====
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = {
    text: quoteText,
    category: quoteCategory
  };

  // Add new quote to the array
  quotes.push(newQuote);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}