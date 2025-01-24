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
REACT_APP_API_URL=https://rickandmortyapi.com/api/
```

### 4. Run the app

Once all dependencies are installed and environment variables are set up, start the development server:

```bash
npm start
```

This will run the app locally at [http://localhost:3000](http://localhost:3000).