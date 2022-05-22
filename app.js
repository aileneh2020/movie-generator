import OPENAI_API_KEY from "./apikey.js";

window.addEventListener('DOMContentLoaded', (e) => {
    setFooterText();
})

document.getElementById('submit-button').addEventListener('click', getResponse);

function setFooterText() {
    const currentYr = new Date().getFullYear();

    document.getElementById('footer-text').innerHTML =
    "&copy " + currentYr + " Ailene Hoang";
}

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

/** change results section from hidden to visible after a request is made **/
function displayResults() {
    document.getElementById('results-container').style.visibility = "visible";
}

/** send request to OpenAI API and obtain a response **/
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
        /** add results in a list from newest to oldest **/
        // document.getElementById('results').insertAdjacentHTML('afterbegin', `<hr><br><strong>Genre:</strong>  ${capitalizedGenre}<br>
        // <strong>Movie Recommendation:</strong>  ${data.choices[0].text}<br><br>`);
        document.getElementById('results').insertAdjacentHTML('afterbegin', `<div class="list-item"><strong>Genre:</strong>  ${capitalizedGenre}<br>
        <strong>Movie Recommendation:</strong>  ${data.choices[0].text}</div>`);
    })
    .catch(error => {
        console.log("Something Went Wrong", error);
    })

    e.preventDefault();

    displayResults();
}

