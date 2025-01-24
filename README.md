# Rick and Morty App

A simple React application that allows users to explore the 
characters, locations, and episodes from the popular TV series "Rick and Morty". 
This app leverages **React**, **TypeScript**, **Axios** for data fetching, 
**React Query** for state management, 
and **React Bootstrap** for styling. 
Additionally, it supports a **dark mode** feature for improved user experience.


## Features

- **Character Search:** View detailed information about characters from the show.
- **Location Search:** Explore the different locations featured in the show.
- **Episode Details:** Get information about individual episodes.
- **Pagination:** Browse through multiple pages of characters, locations, and episodes.
- **Mobile Friendly:** The app is responsive and works well on mobile devices.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: For static type checking.
- **React Query**: A data-fetching library to manage and sync server state.
- **Axios**: A promise-based HTTP client for making requests.
- **React Bootstrap**: A UI framework for building responsive and stylish components.
- **Prettier**: A code formatter for maintaining consistent code style.
- **ESLint**: A linting tool for identifying and fixing problems in the code.

## Setup

To get started with this project, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/jeka400/rick-and-morty-app.git
```

### 2. Install dependencies

```bash
cd rick-and-morty-app
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory of the project and add any necessary environment variables.

Example `.env` content:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id_here
```

### 4. Run the app

Once all dependencies are installed and environment variables are set up, start the development server:

```bash
npm start
```

This will run the app locally at [http://localhost:3000](http://localhost:3000).

## Note:
I am fully aware that environment variables should not be made publicly accessible. However, since this is a task I received from your company, and the Git repository is private and shared only with you for review, I am including the environment variables below for your convenience. You can copy them directly if needed.

```
REACT_APP_API_URL=https://rickandmortyapi.com/api/
REACT_APP_FIREBASE_API_KEY=AIzaSyD8ZZb5TXEo6Qscj4ki8E5MKgS9MOXZSuo
REACT_APP_FIREBASE_AUTH_DOMAIN=shindiri-test.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=shindiri-test
REACT_APP_FIREBASE_STORAGE_BUCKET=shindiri-test.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=52617965392
REACT_APP_FIREBASE_APP_ID=1:52617965392:web:fc3ff399c4d2e6db6e4655
REACT_APP_FIREBASE_MEASUREMENT_ID=G-CBB903KCR9
```
