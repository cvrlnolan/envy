# Envy

A NextJS application showcasing a use-case of an event & venue management platform.
Live version available at: https://envy-cvrlnolan.vercel.app/

## Description

This project is a blueprint(snippet) or template that demonstrates how basic CRUD operations can be applied in a real-world context to solve or ameliorate the management of events & venues.
It covers the creation, display and update of event or venue related data. Additionally, it uses microservice REST API endpoints like payment, map rendering & geolocation for more simulation of a real world situation.
This project's purpose is also to inspire other developers who are trying to develop a similar logic to have an idea on how to go about it.

## Installation

1. To get this project files locally on your machine, you can clone this repository by running the following command on your terminal or command line:

```bash
git clone https://github.com/cvrlnolan/envy
```

2. Next, you need to setup the `.env` file found in the root with the appropriate API Keys & credentials from the following service providers:

- [Google Firebase](https://firebase.google.com/)
- [Paypal Developer](https://developer.paypal.com/)
- [Monetbil](https://monetbil.com) (Optionally used for Mobile Money modes of payment)
- [Mapbox](https://www.mapbox.com/)
- [Mailtrap](https://mailtrap.io/)
- [OpenCage Data](https://opencagedata.com/)

3. Install all the dependency packages found in the `package.json` file by running `yarn install` or `npm install` from the project root directory.

4. To start the development server of the application, run `npm run dev` or `yarn dev`. This should log some start-up application information & display the development server url: `http://localhost:3000`.
   Visit http://localhost:3000 to view your application.

## Usage

### General

This application was built reflecting the MVC architecture and the main dependencies(all found in the `package.json`) of the application are organised as so:

- Front-end User Interface(UI): [Semantic UI React](https://react.semantic-ui.com/)
- Backend Integration: [NextJS API](https://nextjs.org/docs/api-routes/introduction) (basically [NodeJS](https://nodejs.org/))
- Database Management: [Firestore](https://firebase.google.com/products/firestore/) (a database service provided by Google Firebase)
- File Storage: [Firebase Storage](https://firebase.google.com/products/storage/)

Other important services & dependency libraries of the application include:

- [axios](https://www.npmjs.com/package/axios): An http client to fetch urls and make api calls or requests within the application.
- [swr](https://swr.vercel.app/): To fetch and revalidate data on the client-side of the application while keeping the UI reactive.
- [nodemailer](https://nodemailer.com/about/): Module for mail sending after a successful purchase.
- [nodemailer-express-handlebars](https://www.npmjs.com/package/nodemailer-express-handlebars): To handle and compose email templates with dynamic variales.
- [@paypal/react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js): A library to easily integrate the Paypal Javascript SDK components and the Paypal Buttons to the application.
- [compressorjs](https://fengyuanchen.github.io/compressorjs/): Javascript image compressor to compress images before uploading them to storage to have an optimized and servable version.
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup): Mainly used in NextJS serverless functions as these functions are being called in a native NodeJS environment hence the Admin SDK is suitable to connect to Firebase services.
- [react-map-gl](https://visgl.github.io/react-map-gl/): To render a map view based on recieved longitude and latitude parameters.
- [testing-library](https://testing-library.com/): This library provides simple and complete testing utilities to be implement in our test scripts.
- [jest](https://jestjs.io/): A JavaSript Testing Framework to run test scripts in the virtual environment of our application.

### Directives

The application is organized from the root(`.`) as follows:

- `./page/` folder(integrated by NextJS) contains the UI Views for the application with the exception of the `./page/api/*` sub-folder.
- `./page/api` sub-folder(integrated by NextJS) contains serverless and NodeJS backend code for the application.
- `./firebase/` folder contains the database initialization configurations and the subfolders contain database logical operations.
- `./components/` folder contains coded UI layouts to be used through out the application.
- `./components/mailService` sub-folder contains the mailing function component for sending emails and mail templates to use.
- `./assets/` folder contains pre-defined data selections to be used by the appliction.
- `./styles/` folder(integrated by NextJS) contains the global style of the application accessible by all components.
- `./public/` folder(integrated by NextJS) contains global files to be shared through the application. You can store images here.

Absolute imports to any of these folders through the application are configured in the `jsconfig.json` file in the root.

The application's code source contains inline comments which will provide further help and guidance on how an important piece of module or component works.
The code quality was tested with [JSLint](https://www.jslint.com/)

### Deployment

You may eventually want to deploy a live version of your app in a future instance. [Vercel](https://vercel.com) platform is suitably built fo the deployment of NextJS application and more as they have an integrated environment to deploy directly from your own [Github Repository](https://github.com/new).

### Tests

The `tests` folder contains some major component Unit Test scripts which have been passed successfully to ensure the application functions and renders as it is intended to. Only the major components have been tested. You can decide to add more tests on your personal end.

To run a test, type `npm run test` or `yarn test` including the test script you want to run ex:

```bash
yarn test index
```

The `jest.config.js` file contains the configuration options for our [Jest](https://jestjs.io/) Test Runner.

## Support

If any worries, bugs or problem arises in the future, you can create an issue, contribute or contact me via:

- [carlnolan@lootyclub.com](mailto:carlnolan@lootyclub.com)

## Roadmap

This can serve as ground basis for any future ideas or use-case in this context hence strapping it up with some authentication might give it or more secure foundation.

## License

![GitHub](https://img.shields.io/github/license/cvrlnolan/envy)

##

![Codecov](https://img.shields.io/codecov/c/github/cvrlnolan/envy) ![GitHub last commit](https://img.shields.io/github/last-commit/cvrlnolan/envy) ![GitHub contributors](https://img.shields.io/github/contributors/cvrlnolan/envy) ![GitHub issues](https://img.shields.io/github/issues/cvrlnolan/envy) ![GitHub repo size](https://img.shields.io/github/repo-size/cvrlnolan/envy)

###

![GitHub followers](https://img.shields.io/github/followers/cvrlnolan?style=social) ![Twitter Follow](https://img.shields.io/twitter/follow/realcarlnolan?style=social)
