document.addEventListener('DOMContentLoaded', () => {
    const eventId = new URLSearchParams(window.location.search).get('id');
    fetchEventDetails(eventId);
});

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

// Function to fetch event details from SeatGeek
function fetchEventDetails(eventId) {
    const client_id = 'MTI4ODUxNDB8MTY5NjM2NTUzOC41NzAzNzQ1';
    const endpoint = `https://api.seatgeek.com/2/events/${eventId}`;

    return fetch(`${endpoint}?client_id=${client_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(details => {
            document.getElementById('event-title').textContent = details.title;
            // Assuming details.datetime_local contains the date and time
            document.getElementById('event-date').textContent = formatDateTime(details.datetime_local);
            document.getElementById('event-venue').textContent = details.venue.name;
        })
        .catch(error => console.error('Fetch error:', error));
}

// You can call this function with the event ID to get the details
// Example