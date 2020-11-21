const resultsNav = document.getElementById("resultsNav");
const favouritesNav = document.getElementById("favouritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".lodaer");

// NASA API
const count = 5;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favourites = {};

function createDOMNodes() {
    resultsArray.forEach(result => {
        // Create card container
        const card = document.createElement("div");
        card.classList.add("card");
        // Create link element
        const link = document.createElement("a");
        link.href = result.hdurl;
        link.title = "View full image";
        link.target = "_blank";
        // Create image
        const image = document.createElement("img");
        image.src = result.url;
        image.alt = "NASA picture of the day";
        image.loading = "lazy";
        image.classList.add("card-img-top");
        // Card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        // Card title
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = result.title;
        // Save text
        const saveText = document.createElement("p");
        saveText.classList.add("clickable");
        saveText.textContent = "Add to favourites";
        saveText.setAttribute("onclick", `saveFavourite("${result.url}")`);
        // Card text
        const cardText = document.createElement("p");
        cardText.textContent = result.explanation;
        // Footer container
        const footer = document.createElement("small");
        footer.classList.add("text-muted");
        // Date
        const date = document.createElement("strong");
        date.textContent = result.date;
        // Copyright
        const copyrightResult = result.copyright === undefined ? "" : result.copyright;
        const copyright = document.createElement("span");
        copyright.textContent = ` ${copyrightResult} `;
        // Append elements
        footer.append(copyright, date);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody, footer);
        imagesContainer.appendChild(card);
    })
}

function updateDom() {
    // Get items from local storage
    favouriteItems = localStorage.getItem("nasaFavourites");
    if (favouriteItems) {
        favourites = JSON.parse(favouriteItems)
        console.log("favourites local storage", favourites);
    }
    createDOMNodes();
}

// Get 5 images from the API
function getData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            resultsArray = data;
            updateDom();
        })
    .catch(err => console.log(err));
}

// Save result to favourites
function saveFavourite(url) {
    // Loop through the results array to select Favourite
    resultsArray.forEach((item) => {
        if (item.url.includes(url) && !favourites[url]) {
            favourites[url] = item;
            // Show saved to favoruites confirmation for 2 seconds
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 3000);
        // Set favourites in local storage
        localStorage.setItem("nasaFavourites", JSON.stringify(favourites));
        };
    });
}

getData();