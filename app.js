// Get references to the search input and form
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

// Event listener for the form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the user's search query
    const query = searchInput.value.toLowerCase();

    // Perform the search and update the UI (replace this with your actual search logic)
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
