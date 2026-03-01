// data loaded 
let businesses = JSON.parse(localStorage.getItem("businesses")) || [
    { id: 1, name: "Midnight Cafe", category: "Food", rating: 4.5, reviews: [], deal: "10% off after 10PM", is24: true },
    { id: 2, name: "Haven", category: "Retail", rating: 4.2, reviews: [], deal: "Free accessory", is24: false },
    { id: 3, name: "Sparkle Clean", category: "Services", rating: 4.8, reviews: [], deal: "20% off first service", is24: true }
];

let currentList = businesses;

// save data
function saveData() {
    localStorage.setItem("businesses", JSON.stringify(businesses));
}

// display businesses 
function displayBusinesses(list) {
    currentList = list;

    let container = document.getElementById("businessList");
    container.innerHTML = "";

    list.forEach(b => {

        let reviewHTML = "";

        b.reviews.forEach(r => {
            reviewHTML += `<p>• ${r}</p>`;
        });

        container.innerHTML += `
            <div class="card">
                <h3>${b.name}</h3>
                <p>Category: ${b.category}</p>
                <p>Rating: ${b.rating.toFixed(1)}</p>
                <p>Deal: ${b.deal}</p>
                <p>${b.is24 ? " Open 24 Hours" : ""}</p>

                <button onclick="addReview(${b.id})">⭐ Review</button>
                <button onclick="saveFavorite(${b.id})">❤️ Save</button>

                <div>
                    <h4>Reviews:</h4>
                    ${reviewHTML || "<p>No reviews yet</p>"}
                </div>
            </div>
        `;
    });
}

// intial display
displayBusinesses(businesses);

document.getElementById("categoryFilter").addEventListener("change", function() {
    const category = this.value;

    if (category === "All") {
        displayBusinesses(businesses); // show all
    } else {
        // filter by category
        const filtered = businesses.filter(b => b.category === category);
        displayBusinesses(filtered);
    }
});

// sort by rating 
function sortByRating() {
    let sorted = [...currentList].sort((a, b) => b.rating - a.rating);
    displayBusinesses(sorted);
}

// 24-HOUR filter
function filter24() {
    let filtered = businesses.filter(b => b.is24);
    displayBusinesses(filtered);
}

// reset veiw 
function addReview(id) {

    let answer = prompt("What is 3 + 4?");
    if (answer != "7") {
        alert("Bot verification failed");
        return;
    }

    let text = prompt("Write a short review:");

    if (!text) return;

    let business = businesses.find(b => b.id === id);

    business.reviews.push(text);

    saveData();
    displayBusinesses(businesses);
}






// save favourite 
function saveFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(id)) {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Saved!");
}

// show favourite 
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
                <p>${b.is24 ? " Open 24 Hours" : ""}</p>

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

