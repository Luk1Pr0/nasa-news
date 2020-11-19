
// NASA API
const count = 5;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Get 5 images from the API
function getData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            resultsArray = data;
            console.log(resultsArray);
        })
    .catch(err => console.log(err));
}
