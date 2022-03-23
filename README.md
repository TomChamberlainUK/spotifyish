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
- `SASS` — Although design was not a concern for this assessment, design can still be important for functionality. `SASS` extends the functionality and ease of use of `CSS`, and as the project is already being pre-compiled there is no reason not to use it.

As this was a fairly simple application I tried to keep the dependencies minimal.

## Caveats

> As time was a factor, given that I am taking part in multiple interviews a day alongside technical assessments, I had to decide on some compromises to ensure I could perform this task whilst still having time for my other responsibilities.

Here are some areas where I feel that this application has not delivered to the best potential:

- Incomplete Testing — I tried to take a TDD approach to the build of this application but that soon had to abandoned as it was proving a little too tedious. I managed a fair amount of unit tests that covered the rendering of components depending on their props, however these only really scratched the surface of functionality.
- Poor Error Handling for Users — Using an external API in which you have no control over the response can provide a lot of unknown scenarios which should be handled gracefully for the end user. I failed to handle these properly with useful responses for the user, instead opting to log errors to the console. Had I more time, I would implement an error component that gives the end users verbose descriptions of any errors, and how they should continue to use the app. I also failed to handle XHR timeout events. I should have perhaps used `axios` or abstracted fetch requests into their own hook with extended error handling to simplify things.
- I didn't make use of React context which would have simplified the concept of global state. Though normally I'm against global state, some things like user credentials and access tokens are well suited for it. Fortunately the scope of this assessment was fairly small and scalability wasn't stated as a requirement. If I were to extend the functionality of the project however this is something that could become tedious.

## The Next Steps

Given more time, there are plenty of ways that I could improve the application:

- _More_ Features — This might seem painstakingly obvious, but Spotify provide a rich and expansive API that can be taken advantage of. I'd love to implement search, browsing by artist/genre, and the ability to build playlists, just to name a few.
- Routing — This is just a small application at the moment, but as it grows in scale so too does it grow in complexity. `react-router-dom` provides a great API to handle both server and browser side routing, making the application simpler to navigate from a developers perspective.
- Infinite Scroll/Pagination — The application currently just returns the last 20 tracks the user listened to. It would be good to increase this number (asynchronously) via scrolling and pagination.
- Richer Results — Currently the app displays tracks; names, artists, and album art. It would be nice to actually _do_ something with this data. Provide more detailed information when clicked? Add a database and provide a favourites system? Unfortunately I don't think it's possible to enable playback via web apps, but a link to open the official Spotify app for each track might be nice.
- Better Design — I know, it's not part of the spec but it's something I'd certainly want to improve. Great design is more than just artistic — it's vital for a solid user experience. I'd start with making it responsive, I'd imagine mobile users will really struggle with the current design.

## Conclusion

Overall I enjoyed the project, and will probably continue to maintain and improve it over time, starting with deploying it.

It provides a great example of my abilities with JS/TS, React, Auth, consuming RESTful APIs, and writing painstakingly long READMEs.