Events Calendar Project

Overview :

The Events Calendar Project is a web application designed to display events on a calendar. The application renders events in a visually clear and organized manner, ensuring that overlapping events are displayed without visual interference. The calendar covers a specific time range from 09:00 AM to 09:00 PM, and dynamically adjusts based on window size to provide a responsive user experience.

Features :

Time Slot Display: Shows time slots from 09:00 AM to 09:00 PM with 30-minute intervals.
Event Display: Renders events with start times, durations, and ensures that overlapping events are displayed in different columns.
Responsive Layout: Adjusts event widths and positions based on the window size.
Styling: Provides a clean and user-friendly interface with margins between events and fixed time slots.

Technologies Used :

    React: A JavaScript library for building user interfaces, used here for creating reusable components and managing the state of the calendar.

    Next.js: A React framework that provides server-side rendering and static site generation capabilities, used for setting up the project and handling routing.

    TypeScript: A statically typed superset of JavaScript that helps with writing robust and maintainable code.

    CSS Modules: For scoping CSS locally to components, ensuring styles do not leak between components.
    JSON: Used for storing event data and fetching it asynchronously.

Project Structure :

The project is organized as follows :

    /public
        events.json    
    /src
        /app
            pages.tsx       # Main page component
            globals.css     # global css
        /components
             EventsCalendar.tsx    # Component for rendering the calendar and events
        /styles
            evenr.module.css  # CSS Module for styling the EventsCalendar component

Run the Development Server:

npm run dev
# or
yarn dev

Usage :

Viewing the Calendar: Navigate to the main page to view the calendar and events.
Adjusting Events: Modify the events.json file to update or add events.
Responsive Design: Resize the window to see how the calendar adjusts dynamically.

Code Explanation: 

events-calendar.tsx

Component Logic: Manages the fetching, processing, and rendering of events.
Event Handling: Calculates end times, groups overlapping events, and assigns columns to ensure clear display.

Responsive Handling: Adjusts event dimensions and positions based on window size.
EventsCalendar.module.css
Styling: Provides styles for the calendar and events, including margins between events and fixed time slots.

Troubleshooting:

404 Errors: Ensure the events.json file is correctly placed in the /public directory.
Styling Issues: Check the CSS rules and ensure there are no conflicting styles.
