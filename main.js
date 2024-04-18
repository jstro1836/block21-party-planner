// Selecting the event list from the HTML
const eventList = document.querySelector("#event-list"); 
// Selecting the event form from the HTML
const addEventForm = document.querySelector("#add-event-form"); 

// API URL to fetch the events
const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-PT/events";

// Async function to fetch the data from the API
const fetchEvents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const jsonResponse = await response.json();
    displayEvents(jsonResponse.data);
  } catch (error) {
    console.error("Error fetching events: ", error);
  } 
}

// Creates and display the event cards
const displayEvents = (events) => {
  eventList.innerHTML = ''; // Clearing the event list 

  events.forEach(event => { 
    const eventCard = createEventCard(event);
    eventList.appendChild(eventCard);
  });
}

// Creates a card for a single event
const createEventCard = (event) => {
  const eventCard = document.createElement('div');
  eventCard.classList.add('event-card');

  eventCard.innerHTML = `
    <h3>${event.name}</h3>
    <p>${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Location: ${event.location}</p>
    <button class="delete-button" data-event-id="${event.id}">Delete</button>
  `;

  // Adds a click listener to the delete button of the new card
  eventCard.querySelector('.delete-button').addEventListener('click', () => {
    deleteEvent(event.id, eventCard);
  });

  return eventCard;
}

// Handles delete functionality
const deleteEvent = (eventId, eventCard) => eventCard.remove();

// Runs script after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
  // Fetches and displays events on initial load
  fetchEvents();

  // Adds event listener for form submission
  addEventForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the default form submission
  });

  // Adds event listener for button click to add a new event
  document.querySelector("#add-event-button").addEventListener('click', (event) => {
    const newEventName = document.getElementById('eventName').value;
    const newEventDescription = document.getElementById('eventDescription').value;
    const newEventDate = document.getElementById('eventDate').value;
    const newEventLocation = document.getElementById('eventLocation').value;

    if (newEventName && newEventDescription && newEventDate && newEventLocation) { // if all conditions are met
      // Creates a new card and adds it to the list
      const tempEventId = Date.now(); 
      const newEventCard = createEventCard({
        id: tempEventId,
        name: newEventName,
        description: newEventDescription,
        date: newEventDate,
        location: newEventLocation
      });
      eventList.appendChild(newEventCard);

      // Clears the form fields
      addEventForm.reset();
    } else {
      alert("Please fill all the fields."); // Alerts the user if any field is empty
    }
  });
});
