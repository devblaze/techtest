# Wizard World Houses Application

This React application displays information about magical houses from the Wizard World API. It features a responsive design with stylized cards representing each house, displaying details such as founders, traits, house colors, and more.

## Features

- Display house information in stylized cards with color-coded headers
- Search functionality to filter houses by name
- Filter traits within each house card
- Responsive design for various screen sizes
- Custom styling with house color theming

## Prerequisites

Before running this application, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://yarnpkg.com/) package manager

## Installation

1. Clone the repository:
```shell script
git clone https://github.com/devblaze/techtest.git
   cd wizard-world-houses
```


2. Install dependencies:
```shell script
yarn install
```


## Running the Application

### Development Mode

To run the application in development mode:

```shell script
yarn start
```


This will start the React application at [http://localhost:3000](http://localhost:3000) and the API server at [http://localhost:5001](http://localhost:5001).

### Production Build

To create a production build:

```shell script
yarn build
```


The build files will be created in the `build` directory.

## Project Structure

```
wizard-world-houses/
├── src/
│   ├── components/
│   │   ├── HouseCardComponent.tsx  # House card component
│   │   ├── SpinnerComponent.tsx    # Loading spinner
│   │   ├── HouseCard.css           # Styles for house cards
│   │   └── Spinner.css             # Styles for spinner
│   ├── types/
│   │   └── HouseTypeDefinitions.ts # TypeScript interfaces
│   ├── App.tsx                     # Main App component
│   ├── App.css                     # App styles
│   ├── index.tsx                   # Entry point
│   └── index.css                   # Global styles
├── backend/
│   └── src
│       └── index.ts                # API server
├── public/
│   └── index.html                  # HTML template
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```


## API Server

This project includes a simple Express server that serves as a proxy to the Wizard World API. The server runs on port 5001 (configurable via .env file) and provides the following endpoint:

- `GET /api/houses` - Returns a list of houses, can be filtered with the `name` query parameter

### Starting the Server

The server starts automatically when you run `yarn start`. If you want to run just the server:

```shell script
cd backend
yarn start
```


## Available Scripts

In the project directory, you can run:

- `yarn start` - Runs the app and server in development mode
- `yarn build` - Builds the app for production
- `yarn test` - Runs tests
- `yarn eject` - Ejects from create-react-app
- `yarn lint` - Runs ESLint to check for code issues
- `yarn format` - Formats code using Prettier

## Dependencies

This project uses the following main dependencies:

- React 19.1.0
- TypeScript 4.9.5
- Axios for API requests
- Express for the backend server

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
PORT=5001  # Port for the API server
```
