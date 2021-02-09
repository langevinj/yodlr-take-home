# Yoldr Front End Engineer Code/Design Challenge - Jeremy Langevin

This is my take on the rithmschool practice take home challenge that [can be found here](https://github.com/rithmschool/yodlr-take-home).

## Getting Started
To use this application, download and install [NodeJS](https://nodejs.org/download/).

There are two ways of downloading this project:
1. Download & extract a zip file of the source.
2. Fork this repository and git clone your fork.

Install the dependencies in the top-most directory of the source:

```
npm install
```

Then, you can start the application server:

```
npm start
```

The server will them be running on [http://localhost:3000](http://localhost:3000).

To stop the server, press CTRL-C.

## Technologies
* Express
* Node JS
* Bootstrap
* Jest
* Supertest
* Axios

## Requirements
* Users should be able to register:
    - Added form fields for first and last name
    - Event listen sending axios requests to POST /users route
    - Validation with UI alerts for invalid or duplicate data
* Admin page should list all users:
    - Axios GET /users request added on window load
    - Table created to display user data
* Design/layout of content:
    - Bootstrap used alongside minor CSS to stylize website
    - Background pattern, buttons, navigation bar, alerts all added
    - Stylized table for displaying users

## Bonuses
* Signup for validation
    - On submitting the signup form each credential is tested in validator.js before a user is added. If errors are present the user is not added and the external user receives clarification on the error.
* Admin button to activate accounts (set user status to 'active')
    - On the admin page, a user's state is displayed by a button which the admin can toggle. The display will change automatically, and a PUT request will be sent to update the user's state on the backend.

## Testing
* Unit tests written for routes, validator functions and admin functions.

Tests can be run together with the command:
```
npm test --runInBand
```

Or separately:
```
npm test NAME_OF_FILE.test.js
```