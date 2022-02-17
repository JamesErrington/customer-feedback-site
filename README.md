# Customer Feedback Page

To run:
```
npm install
npm run build
npm start
```

To develop with automatic rebuilds:
```
npm run watch
```
Visit http://localhost:8080/#/ to access the site.

To run the tests:
```
npm run test:client
npm run test:server
```

To lint and format:
```
npm run lint
npm run format
```

## About the site
There are 3 products, ids 1, 2, and 3, which are selected via the URL e.g.

- http://localhost:8080/#/1
- http://localhost:8080/#/2
- http://localhost:8080/#/3

http://localhost:8080/#/ will redirect to id 1 for convienience. Other ids will result basic error handling being displayed.

### Architecture
The site runs a Node / Express backend to serve a React frontend. The frontend makes use of state management via valtio, alongside built-in Suspense and ErrorBoundary components to provide basic fallback functionality. SemanticUI-React was used for improved styling of core components.

Both the front and back end are written in Typescript for type-safety and easier development, and tested with Jest. ESLint and Prettier are provided for automatic linting and formatting, which will integrate with IDE plugins.

The backend includes fake 'delay' to simulate a more realistic user experience, since running on localhost and accessing the file system is very quick.

### Next steps
- The server runs off of `.json` files instead of a proper data management system.
- Whilst present, the error management in the front end is basic and the site needs e.g. a proper 404 page, redirects, a main page to fall back to.
- The chart labels are cut off, but I do not have enough experience with Chart.js to work out the fix.
- The 'Helpful' action does nothing as really this requires things like user accounts to track which comments you are allowed to upvote.
- Whilst present, some of the tests are a bit basic and could be complimented with other technologies like Cypress.
- The review scores are meaningless and not calculated from anything - part of just using fake `.json` data.
