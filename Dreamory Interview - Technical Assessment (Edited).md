# Dreamory Interview - Technical Assessment

## Event Management Platform

An event management platform (SaaS) for organisation (corporate) and public users who looking for or wanted to join an event(s).

The candidate should create a simple event management app using **`MERN`** stack.

### Main goal

We're looking for developers who are passionate about their work and can quickly acquire new skills, regardless of their technical background. We believe in equal opportunities for everyone who meets these qualifications, and we would love for you to join our team.

### Rules

1. Commit your code to github (Remember to include your .env file if any)
2. Share with us your repository URL once you have completed the assessment.

The app should have the following features:

### Features

#### Admin Portal

1. **Registration**: 
   1. User can sign up for an admin portal account.
2. **Login**: 
   1. User can log in to the admin portal using email and password credentials.
3. **List events**: 
   1. Events are displayed in a table format for easy reference.
4. **Create event**:
   1. User can create new events by providing details such as Event Name, Start Date, End Date & Location.
   2. User can upload an event poster thumbnail.
   3. Newly created events are automatically set with a status of "Ongoing".
5. **Update event**: 
   1. User can edit event details and change the uploaded thumbnail.
   2. A dropdown menu allow users to switch the event status between "Ongoing" and "Completed".
6. **Delete event**: 
   1. Users can delete events, with password validation required for confirmation to ensure security.
7. **Filter events**: 
   1. Implement a simple filter mechanism allowing users to switch between viewing all events, completed events, and ongoing events.

#### User Portal

1. **List events**: 
   1. Events are presented in a thumbnail gallery format for easy browsing.
2. **Select event**: 
   1. Users can select individual events to view their details

### Guidelines and Requirements:

#### Frontend
1. Write code in TypeScript.
2. Use ReactJS to develop the frontend.
3. Showcase the implementation of React Hook Form for efficient form handling with proper data validation.
4. Employ TanStack Query for data fetching and state management.
5. Use Material UI as the CSS framework.
6. Organizing the application into reusable components with proper separation of concerns.

#### Backend
1. Write code in TypeScript.
2. Use ExpressJS to develop the backend.
3. Set up MongoDB as the database solution for storing event data
4. Use mongoose for database interactions.
5. Organize the backend according to the MVP structure, incorporating Model, Controller & Service layers.
6. Implement a proper JWT authentication mechanism or equivalent method to secure backend APIs
7. Encrypt user passwords before storing them

### Bonus
1. Implement comprehensive data validation mechanisms in both frontend and backend to ensure the integrity and validity of user inputs.
2. Implement token verification mechanisms to authenticate and authorize API requests, ensuring that only authenticated users can access protected resources.
3. Implement pagination to accept pagination parameters (page, limit) and adjust MongoDB queries to skip over the appropriate number of documents and limit results per page.
4. Enhance the frontend application with responsive design techniques, ensuring that the UI adapts seamlessly to different screen sizes.
