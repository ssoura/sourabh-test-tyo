# contacts management system api

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition or Create Instance on cloud like atlas
- Edit .env file
- `npm run dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [cors](https://github.com/expressjs/cors) - Node.js CORS middleware
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env file

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `controllers/` - This folder contains functions for handling incoming requests and returning responses to the client.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Available Endpoints:

### Get single contact ( GET request )

- `http://example.com/contacts/{id}`

### Get all contacts ( GET Request )

- `http://example.com/contacts/`

### Create new contact: ( POST Request )

- `http://example.com/contacts/`

### Edit contact: ( POST Request )

- `http://example.com/contacts/{id}`
