# NgAccepted

This project is an implementation of the assignment for Accepted Ltd and was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project structure

(The project structure was inspired by [this](https://gist.github.com/trungk18/7ef8766cafc05bc8fd87be22de6c5b12) post.)

- `main` -> Contains the bootstrap process of the application, as long as the initial route, necessary providers and the BACKEND_URL injection token.

- `app.component` -> Contains the basic structure of the app, like the header & the router-outlet template and initializes the app theme.

- `shell` -> Contains the search and select fields, which handle the data to be displayed in the UI. It also contains an inner router-outlet for the different kinds of data categories, in the shell routes. The `data-access` folder contains the interface of the selection.

- `sports` -> Contains the sports routes & the sports component, whick contains the logic. The `ui` folder contains the template of the sports item and the `data-access` folder contains the `Sport` interface, as long as the `resolver` for prefetching the data.

- `leagues` -> Contains the leagues routes & the leagues component, whick contains the logic. The `ui` folder contains the template of the leagues item and the `data-access` folder contains the `League` interface, as long as the `resolver` for prefetching the data.

- `countries` -> Contains the countries routes & the countries component, whick contains the logic. The `ui` folder contains the template of the countries item and the `data-access` folder contains the `Country` interface, as long as the `resolver` for prefetching the data.

- `shared` -> Contains the `header` component, which implements the theme toggle funcionality, the `detail-dialog` component, which implements the detail view of the `sport-item` in a Material Dialog and the `data-access` folder, which contains the `sports-db` service, which implements the API data handling and the `theme` service, which handles the light/dark theme.
