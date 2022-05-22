import OPENAI_API_KEY from "./apikey.js";

/********** FUNCTIONS **********/

// obtains current year to add to footer text
function setFooterText() {
    const currentYr = new Date().getFullYear();

    document.getElementById('footer-text').innerHTML =
    "&copy " + currentYr + " Ailene Hoang";
}

// change results section from hidden to visible after a response is received
function displayResults() {
    document.getElementById('results-container').style.visibility = "visible";
}

// prepares prompt with the selected genre added
function generatePrompt(genre) {
    return `Suggest a movie to watch.
    
    Genre: Action
    Movies: White House Down, Terminator
    Genre: Family
    Movies: Up, Wonder
    Genre: Romance
    Movies: The Wedding Planner, To All The Boys I've Loved Before
    Genre: Thriller
    Movies: The Purge, Nightcrawler
    Genre: ${genre}
    Movies:`;
}

// send request to OpenAI API and obtain a response
function getResponse(e) {
    const selectedGenre = document.getElementById('genre-selector').value;
    const capitalizedGenre = selectedGenre[0].toUpperCase() + selectedGenre.slice(1).toLowerCase();
    const data = {
        prompt: generatePrompt(capitalizedGenre),
        temperature: 1,
        max_tokens: 256,
        top_p: 0.7,
        frequency_penalty: 1,
        presence_penalty: 1,
    };
        
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('results').insertAdjacentHTML('afterbegin', `<div class="list-item"><strong>Genre:</strong>  ${capitalizedGenre}<br>
        <strong>Movie Recommendation:</strong>  ${data.choices[0].text}</div>`);
    })
    .catch(error => {
        console.log("Something Went Wrong", error);
    })

    e.preventDefault();

    displayResults();
}

/********** EVENT LISTENERS **********/

// sets footer text once page is loaded
window.addEventListener('DOMContentLoaded', (e) => {
    setFooterText();
})

// calls getResponse function when button is clicked
document.getElementById('submit-button').addEventListener('click', getResponse);