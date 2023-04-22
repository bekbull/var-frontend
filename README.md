# MERN Movie Saver App

This MERN Movie Saver App was created for a university hackathon to save movies from Beat Film. The app allows users to create accounts, search for movies, and save their favorite movies to a personal list.

## Features

- User authentication (register and login)
- Search for movies by title
- View movie details (title, year, director, plot)
- Save movies to a personal list
- Remove movies from personal list

## Technologies Used

- MongoDB
- Express
- React
- Node.js

## Installation

To install the MERN Movie Saver App, please follow the steps below:

1. Clone the repository to your local machine
2. Navigate to the root directory of the project in your terminal
3. Run `npm install` to install the server-side dependencies
4. Navigate to the client directory by running `cd client`
5. Run `npm install` to install the client-side dependencies
6. Navigate back to the root directory by running `cd ..`
7. Create a `.env` file in the root directory and add the following variables:
   - `MONGO_URI`: the URI for your MongoDB database
   - `JWT_SECRET`: a secret string used to sign JSON Web Tokens for user authentication
8. Run `npm run dev` to start the server and client concurrently

## Usage

To use the MERN Movie Saver App, follow these steps:

1. Register a new account or log in to an existing account
2. Use the search bar to search for movies by title
3. Click on a movie to view more details
4. Click the "Save" button to add the movie to your personal list
5. View your personal list by clicking the "My List" button in the navigation bar
6. Remove movies from your personal list by clicking the "Remove" button next to the movie

## Contributors

- [@bekbull](https://github.com/bekbull)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

