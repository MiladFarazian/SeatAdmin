import requests

# Replace 'YOUR_API_KEY' with your actual SeatGeek API key
api_key = '9a67be7df0769914cb58e8855b1bb65e011f63dac0fcc886fd21fb8f93bd59a0'

client_id = 'MTI4ODUxNDB8MTY5NjM2NTUzOC41NzAzNzQ1'

# Define the API endpoint for popular events
endpoint = 'https://api.seatgeek.com/2/events'

# Set parameters to specify popular events
params = {
    'client_id': client_id,
    'sort': 'popularity.desc',  # Sort by popularity
    'per_page': 10,  # Increase the number of events per page
}

# Make the API request
response = requests.get(endpoint, params=params)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    data = response.json()
    # Process and store the list of popular events from the 'events' key in the response
    popular_events = data.get('events', [])
    print(popular_events)
else:
    print(f"Error: {response.status_code}")
