// LOAD DATA OR CREATE DEFAULT
let businesses = JSON.parse(localStorage.getItem("businesses")) || [
    { id: 1, name: "Midnight Cafe", category: "Food", rating: 4.5, reviews: [], deal: "10% off after 10PM", is24: true },
    { id: 2, name: "Tech Haven", category: "Retail", rating: 4.2, reviews: [], deal: "Free accessory", is24: false },
    { id: 3, name: "Sparkle Clean", category: "Services", rating: 4.8, reviews: [], deal: "20% off first service", is24: true }
];

// SAVE DATA
function saveData() {
    localStorage.setItem("businesses", JSON.stringify(businesses));
}

// DISPLAY BUSINESSES
function displayBusinesses(list) {
    let container = document.getElementById("businessList");
    container.innerHTML = "";

    list.forEach(b => {
        container.innerHTML += `
            <div>
                <h3>${b.name}</h3>
                <p>Category: ${b.category}</p>
                <p>Rating: ${b.rating.toFixed(1)}</p>
                <p>Deal: ${b.deal}</p>
                <p>${b.is24 ? "Open 24 Hours" : ""}</p>

                <button onclick="addReview(${b.id})">Leave Review</button>
                <button onclick="saveFavorite(${b.id})">❤️ Save</button>
            </div>
            <hr>
        `;
    });
}

// INITIAL DISPLAY
displayBusinesses(businesses);

// CATEGORY FILTER
document.getElementById("categoryFilter").addEventListener("change", function() {
    let category = this.value;

    if (category === "All") {
        displayBusinesses(businesses);
    } else {
        let filtered = businesses.filter(b => b.category === category);
        displayBusinesses(filtered);
    }
});

// SORT BY RATING
function sortByRating() {
    let sorted = [...businesses].sort((a, b) => b.rating - a.rating);
    displayBusinesses(sorted);
}

// 24-HOUR FILTER
function filter24() {
    let filtered = businesses.filter(b => b.is24);
    displayBusinesses(filtered);
}

// RESET VIEW
function resetView() {
    displayBusinesses(businesses);
}

// ADD REVIEW + BOT CHECK
function addReview(id) {
    let answer = prompt("What is 3 + 4?");
    if (answer != "7") {
        alert("Bot verification failed");
        return;
    }

    let rating = parseFloat(prompt("Enter rating (1-5):"));

    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert("Invalid rating");
        return;
    }

    let business = businesses.find(b => b.id === id);

    business.reviews.push(rating);

    let total = business.reviews.reduce((a, b) => a + b, 0);
    business.rating = total / business.reviews.length;

    saveData();
    displayBusinesses(businesses);
}

// SAVE FAVORITE
function saveFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(id)) {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Saved!");
}

// SHOW FAVORITES
function showFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let favBusinesses = businesses.filter(b => favorites.includes(b.id));

    displayBusinesses(favBusinesses);
}


function displayBusinesses(list) {
    let container = document.getElementById("businessList");
    container.innerHTML = "";

    list.forEach(b => {
        container.innerHTML += `
            <div class="card">
                <h3>${b.name}</h3>
                <p><strong>Category:</strong> ${b.category}</p>
                <p><strong>Rating:</strong> ${b.rating.toFixed(1)}</p>
                <p><strong>Deal:</strong> ${b.deal}</p>
                <p>${b.is24 ? "⏰ Open 24 Hours" : ""}</p>

                <button onclick="addReview(${b.id})">⭐ Review</button>
                <button onclick="saveFavorite(${b.id})">❤️ Save</button>
            </div>
        `;
    });
}

//Random Suprise Me Button 

function randomBusiness() {
    const randomIndex = Math.floor(Math.random() * businesses.length);
    const chosen = businesses[randomIndex];

    document.getElementById("randomResult").innerHTML= chosen.name;
}
