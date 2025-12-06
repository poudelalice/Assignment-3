// MY GIPHY API KEY - sBhl14eaIb2EeXVaOBHIo7c5pT5XcbGf

const API_KEY = 'sBhl14eaIb2EeXVaOBHIo7c5pT5XcbGf';

// Base URLs for different Giphy API endpoints
const SEARCH_URL = 'https://api.giphy.com/v1/gifs/search';
const TRENDING_URL = 'https://api.giphy.com/v1/gifs/trending';

// Function to search for GIFs based on what the user types
async function searchGifs() {
    // Get what the user typed in the search box
    const searchTerm = document.getElementById('searchInput').value;
    
    // Make sure the user actually typed something
    if (searchTerm === '') {
        alert('Please enter a search term!');
        return; // Stop the function if nothing was typed
    }
    
    // Build the complete URL with our search term and API key
    // This follows the Giphy API documentation format
    const url = `${SEARCH_URL}?api_key=${API_KEY}&q=${searchTerm}&limit=12`;
    
    // Log to console so we can see what's happening (for debugging)
    console.log('Searching for:', searchTerm);
    console.log('API URL:', url);
    
    try {
        // Make the API call (fetch data from Giphy)
        // 'await' means wait for the response before continuing
        const response = await fetch(url);
        
        // Convert the response to JSON format so we can use it
        const data = await response.json();
        
        // Log the data to see what we got back (good for learning!)
        console.log('API Response:', data);
        
        // Call function to display the GIFs on our page
        displayGifs(data.data);
        
    } catch (error) {
        // If something goes wrong, show an error message
        console.error('Error fetching GIFs:', error);
        alert('Oops! Something went wrong. Check the console for details.');
    }
}

// NEW FEATURE: Function to load trending GIFs
async function loadTrendingGifs() {
    // Build URL for trending endpoint (different from search)
    const url = `${TRENDING_URL}?api_key=${API_KEY}&limit=12`;
    
    console.log('Loading trending GIFs...');
    
    try {
        // Fetch trending GIFs from API
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Trending GIFs:', data);
        
        // Display the trending GIFs
        displayGifs(data.data);
        
    } catch (error) {
        console.error('Error fetching trending GIFs:', error);
        alert('Could not load trending GIFs. Check console.');
    }
}

// Function to display GIFs on the page
function displayGifs(gifs) {
    // Get the container where we'll put the GIFs
    const container = document.getElementById('gifContainer');
    
    // Clear any previous GIFs first
    container.innerHTML = '';
    
    // Check if we got any results
    if (gifs.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No GIFs found. Try a different search!</p>';
        return;
    }
    
    // Loop through each GIF in the data we got back
    gifs.forEach(gif => {
        // Create a new div for each GIF
        const gifDiv = document.createElement('div');
        gifDiv.className = 'gif-item';
        
        // Create an img element for the GIF
        const img = document.createElement('img');
        // Get the GIF URL from the data (using fixed_height version for good quality)
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title; // Alt text for accessibility
        
        // NEW FEATURE: Add title/info overlay
        const infoDiv = document.createElement('div');
        infoDiv.className = 'gif-info';
        
        // Create title element
        const title = document.createElement('p');
        title.className = 'gif-title';
        title.textContent = gif.title || 'Untitled GIF';
        
        // Create rating badge (G, PG, PG-13, etc.)
        const rating = document.createElement('span');
        rating.className = 'gif-rating';
        rating.textContent = gif.rating.toUpperCase();
        
        // Add title and rating to info div
        infoDiv.appendChild(title);
        infoDiv.appendChild(rating);
        
        // Add the image and info to the div
        gifDiv.appendChild(img);
        gifDiv.appendChild(infoDiv);
        
        // Add the div to the container on our page
        container.appendChild(gifDiv);
    });
}

// Wait for the page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    // Get the search button
    const searchBtn = document.getElementById('searchBtn');
    
    // Get the trending button
    const trendingBtn = document.getElementById('trendingBtn');
    
    // When search button is clicked, run the searchGifs function
    searchBtn.addEventListener('click', searchGifs);
    
    // When trending button is clicked, load trending GIFs
    trendingBtn.addEventListener('click', loadTrendingGifs);
    
    // Also allow searching by pressing Enter key in the input box
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchGifs();
        }
    });
    
    // Load trending GIFs when page first loads (nice welcome!)
    loadTrendingGifs();
});