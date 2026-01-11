const SERVER_URL = "https://jsonplaceholder.typicode,com/posts";

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

function createAddQuoteForm() {
  const quoteForm = document.createElement("form");
  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.placeholder = "Quote Text";
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Category";
  const button = document.createElement("button");
  button.textContent = "Add Quote";
  button.type = "submit";
  
  forms.append(textInput, categoryInput, button);
  document.body.appendChild(form);
  forms.addEventListener("submit", function (e){
  e.preventDefault();
  addQuote();
  });
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

  populateCategories();
  filterQuotes();

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

const categoryFilter = document.getElementById("categoryFilter");

function populateCategories() {
  // Get unique categories
  const categories = ["all"];

  quotes.forEach(quote => {
    if (!categories.includes(quote.category)) {
      categories.push(quote.category);
    }
  });

  // Clear dropdown
  categoryFilter.innerHTML = "";

  // Add options
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
  }
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;

  // Save selected category
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(
      quote => quote.category === selectedCategory
    );
  }

  displayQuotes(filteredQuotes);
}

function displayQuotes(quotesToDisplay) {
  quoteContainer.innerHTML = "";

  if (quotesToDisplay.length === 0) {
    quoteContainer.textContent = "No quotes found.";
    return;
  }

  quotesToDisplay.forEach(quote => {
    const p = document.createElement("p");
    p.textContent = `"${quote.text}" — ${quote.category}`;
    quoteContainer.appendChild(p);
  });
}

async function fetchServerQuotes() {
    try {
        const response = await fetch(SERVER_URL);
        const data = await response.json();

        // Convert server data to our quote format
        const serverQuotes = data.slice(0, 5).map(item => ({ 
            text: item.title,
            category: "server"
        }));
        syncWithServer(serverQuotes);
      } 
      
      catch (error) {
        console.error("Server fetch failed:", error);
        alert("Server fetch failed - check console");
      }
    }
    
function syncWithServer(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Simple conflict rule: server data takes precedence
  const mergedQuotes = [...serverQuotes];

  localStorage.setItem("quotes", JSON.stringify(mergedQuotes));
  quotes.length = 0;
  quotes.push(...mergedQuotes);

  populateCategories();
  filterQuotes();

  showSyncNotification();
}

function showSyncNotification() {
  alert("Quotes synced with server. Server data was applied.");
}
// Run server sync once when page loads
fetchServerQuotes();
// Sync with server every 30 seconds (simulation)
setInterval(fetchServerQuotes, 30000);