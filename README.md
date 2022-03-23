# 🎧 Spotify*ish*

> Please note that this is part of a technical test performed under time constraints, this README will reflect the requirements of the test. The test is a *functional* one, and so design has not been taken into consideration past simple usability.

## Requirements

✅ A user should be able to view a grid of their recently played tracks.
- ✅ This should include a relevant image for each track.

✅ In a sidebar, a user should be able to view a list of all recently played artists.
- ✅ This should be in order of most recently played.
- ✅ On click of an artist, the grid of recently played tracks should be filtered by the relevant artist.
- ✅ BONUS | On refresh of the page, any applied filter should be persisted.

## Getting Started

> Ensure both Node/npm are installed (I'm using Node.js v17.3.1 and npm v8.3.0).

Download, clone, or fork this repository, navigate to the route folder in a terminal and enter:

```bash
npm i
```

This will install all dependencies and ensure the app is ready to run.

## Scripts

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The existing start, build, test, and eject scripts are still intact.

### Start

To start the app running in development mode at [http://localhost:3000](http://localhost:3000):

```bash
npm run start
```

### Test

To run tests using Jest:

```bash
npm run test
```

### Build

To build the application ready for production:

```bash
npm run build
```

### Serve

Once `built` the application is ready to be served at [http://localhost:3000](http://localhost:3000):

```bash
npm run serve
```

## Tech Stack

This project was built using:

- `Typescript` — The type checking helps to improve stability of the app by catching most type-mismatch bugs before they appear.
- `React.js` — Simple and streamlined DOM manipulation alongside great module encapsulation. Simplifies the production process and allows for great scalability. For this project I used the `npx create-react-app` script due to time constraints. Normally I prefer to build apps from scratch with `webpack` so I have more fine-tuned granular control over compilation.
- `Express.js` — Simple framework for serving files, handles serving a static folder with ease.
- `Jest` — For straightforward asynchronous testing. Works well with React using the correct `@testing-library`s.