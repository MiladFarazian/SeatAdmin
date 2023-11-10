// Function to format the date and time
function formatDateTime(dateTime) {
    const eventDate = new Date(dateTime);
    const month = eventDate.toLocaleString('default', { month: 'short' });
    const day = eventDate.getDate();
    const year = eventDate.getFullYear();
    const hour = eventDate.getHours();
    const minute = eventDate.getMinutes();
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format

    return `${month} ${day}${getNumberSuffix(day)}, ${year} at ${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

// Function to get the suffix for a number (e.g., 'st', 'nd', 'rd', 'th)
function getNumberSuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}


// Function to populate event cards
function populateEventCards(eventsData) {
    const eventSection = document.querySelector('.events');
    eventSection.innerHTML = ''; // Clear existing event cards

    eventsData.forEach((event) => {
        // Create an event card
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';

        // Create an image element for the event
        const eventImage = document.createElement('img');
        eventImage.classList.add('event_image');
        eventImage.src = event.performers[0].image; // Assuming 'image' is a property in your event data

        // Create elements for the event details
        const eventTitle = document.createElement('h2');
        eventTitle.textContent = event.title; // Use the 'title' field from your data

        const eventDate = document.createElement('p');
        eventDate.innerHTML = `Date: ${formatDateTime(event.datetime_local)}`; // Format date and time

        const eventLocation = document.createElement('p');
        eventLocation.textContent = `Location: ${event.venue.display_location}`; // Use the 'venue.display_location' field

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy Tickets';
        //buyButton.href = `event-details.html?title=${encodeURIComponent(event.title)}`; // Point to new HTML page with title parameter
        //buyButton.target = '_blank'; // Open link in new tab
        buyButton.addEventListener('click', function() {
            // Open the new page with the event details on button click
            window.open(`event-details.html?title=${encodeURIComponent(event.title)}`, '_blank');
        });

        // Append event details and image to the event card
        eventCard.appendChild(eventImage);
        eventCard.appendChild(eventTitle);
        eventCard.appendChild(eventDate);
        eventCard.appendChild(eventLocation);
        eventCard.appendChild(buyButton);

        // Append the event card to the events section
        eventSection.appendChild(eventCard);
    });
}


// Function to fetch events from SeatGeek
function fetchSeatGeekEvents() {
    // Replace 'YOUR_API_KEY' with your actual SeatGeek API key
    const api_key = '9a67be7df0769914cb58e8855b1bb65e011f63dac0fcc886fd21fb8f93bd59a0';
    const client_id = 'MTI4ODUxNDB8MTY5NjM2NTUzOC41NzAzNzQ1';

    // Define the API endpoint for popular events
    const endpoint = 'https://api.seatgeek.com/2/events';

    // Set parameters to specify popular events
    const params = {
        'client_id': client_id,
        'sort': 'popularity.desc',  // Sort by popularity
        'per_page': 10,  // Increase the number of events per page
    };

    // Make the API request
    fetch(endpoint + '?' + new URLSearchParams(params))
        .then(response => response.json())
        .then(data => {
            // Process and store the list of popular events from the 'events' key in the response
            const popularEvents = data.events || [];
            // Call the function to populate event cards
            populateEventCards(popularEvents);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Call the function to fetch and populate SeatGeek events
fetchSeatGeekEvents();


// Get references to the search input and form
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

// Event listener for the form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the user's search query
    const query = searchInput.value.toLowerCase();

    // Filter and display event cards based on the search query
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((eventCard) => {
        const eventTitle = eventCard.querySelector('h2').textContent.toLowerCase();
        if (eventTitle.includes(query)) {
            eventCard.style.display = 'block';
        } else {
            eventCard.style.display = 'none';
        }
    });
});

const eventCardsContainer = document.querySelector('.event-cards-container');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const eventCards = document.querySelectorAll('.event-card');
//const cardWidth = eventCards[0].offsetWidth;
const cardMargin = 10; // Adjust this margin as needed

let currentIndex = 0;

// Calculate the number of cards visible at once
const cardsVisible = 3;

// Enable or disable navigation buttons based on the current index
function updateNavigation() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= eventCards.length - cardsVisible;
}

// Update the position of the event cards container
function updateCardContainer() {
    const offset = currentIndex * (cardWidth + cardMargin);
    eventCardsContainer.style.transform = `translateX(-${offset}px)`;
}

// Event listeners for previous and next buttons
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= cardsVisible;
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        updateCardContainer();
        updateNavigation();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < eventCards.length - cardsVisible) {
        currentIndex += cardsVisible;
        if (currentIndex > eventCards.length - cardsVisible) {
            currentIndex = eventCards.length - cardsVisible;
        }
        updateCardContainer();
        updateNavigation();
    }
});

// Initial setup
updateNavigation();
