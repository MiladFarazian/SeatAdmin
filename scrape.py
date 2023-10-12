import requests

# Replace 'YOUR_API_KEY' with your actual SeatGeek API key
api_key = '9a67be7df0769914cb58e8855b1bb65e011f63dac0fcc886fd21fb8f93bd59a0'

client_id = 'MTI4ODUxNDB8MTY5NjM2NTUzOC41NzAzNzQ1'

# Define the API endpoint for popular events (this may vary based on API version)
endpoint = 'https://api.seatgeek.com/2/events'

# Set parameters to specify popular events
params = {
    'client_id': api_key,
    'sort': 'popularity.desc',  # Sort by popularity
    'per_page': 10,            # Number of events per page
}

# Make the API request
response = requests.get(endpoint, params=params)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    data = response.json()
    # Process and display the list of popular events from the 'events' key in the response
    popular_events = data.get('events', [])
    for event in popular_events:
        print(event['title'])
else:
    print(f"Error: {response.status_code}")
