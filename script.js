// MY GIPHY API KEY - sBhl14eaIb2EeXVaOBHIo7c5pT5XcbGf

const API_KEY = 'sBhl14eaIb2EeXVaOBHIo7c5pT5XcbGf';

// Base URL for Giphy API - this is where we send our requests
const BASE_URL = 'https://api.giphy.com/v1/gifs/search';

//Function to search for GIFs based on what the user types
function searchGifs() {
    //Getting what the user typed in the search box
    const searchTerm = document.getElementById('searchInput').value;
    
    //making sure the user actually typed something
    if (searchTerm === '') {
        alert('Please enter a search term!');
        return; //stopping the function if nothing was typed
    }
    
    //Logging to console so we can see what's happening for debugging
    console.log('Searching for:', searchTerm);
}

// Wait for the page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    // Get the search button
    const searchBtn = document.getElementById('searchBtn');
    
    // When button is clicked, run the searchGifs function
    searchBtn.addEventListener('click', searchGifs);
    
    // Also allow searching by pressing Enter key in the input box
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchGifs();
        }
    });
});