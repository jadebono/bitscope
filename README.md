# `Bitscope - The Bitcoin Explorer`

**Author:** Joseph Anthony Debono,  
**email:** [joe@jadebono.com](joe@jadebono.com)  
**Frontend:** [Localhost:3000](http:localhost:3000/)  
**Backend:** [Localhost:4000](http:localhost:4000/)  
**Date of commencement:** 29 September 2023  
**License:** MIT

---

# Functionality

## `Implemented features`

1. Search for bitcoin addresses and transaction IDs. Any other search term will generate an error notification;
1. Values are in BTC unless a user creates an account and logs in;
1. There is a subscribe facility that enable a user to subscribe to a newsletter and unsubscribe from it;
1. There is also a contact form that sends an email to the app;
1. Unregistered users are free to subscribe to the newsletter and use the contact form;
1. Users can register for added functionality;
1. During the registration process, user registers his name, surname, username, email, password and preferred currency (BTC/EUR/USD);
1. For security purposes all the user details are encrypted, except the password which is hashed, so if the database is hacked, the safety of all the data would be ensured;
1. Once registration is successful, the user is notified to log in, which he can do by clicking on the user account roundel on the far right of the screen;
1. Once a user logs in, the user account roundel turns bright orange and a status panel becomes visible;
1. A logged-in user can easily change his username, email, and choice of currency. He can also easily delete his account;
1. A logged-in user can search for addresses and transactions and get values in his preferred currency;
1. A logged-in user can subscribe for updates to any bitcoin address he is interested in. This functionality was not extended to transactions because once the transactions are added to the blockchain they become immutable;
1. A logged-in user can close the webpage without losing the active session, which only expires after four hours OR if the user logs out himself;
1. Once a user logs in and subcribes to addresses, a webhook is registered with blockcypher and when notifications are forthcoming in, they appear on the frontend to notify him of changes to his subscribed addresses (not fully functional as need actual notifications to build this functionality - my test webhooks have not updated yet);
1. The frontend is fully responsive.

## `Features not implemented`

1. Notification of update to subscribed address hash. Reason: The addresses I tested these with did not update in the time the tunnel lasted so eventData was forthcoming for me to examine its morphology and send it to the frontend and display the notification.

## `Main Problem`

- Limitations of free blockcypher API plan

---

# Frontend

This project was bootstrapped with:

[Create React App](https://github.com/facebook/create-react-app)  
[React Redux](https://react-redux.js.org/)  
[Redux Toolkit](https://redux-toolkit.js.org/)  
[Tailwind](https://tailwindcss.com/)

## Available Scripts

In the frontend/ directory, you can run:

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

---

# `Installing and running the Frontend`

installing and running the the frontend:

```bash
cd frontend
npm install
npm start
```

## `Name and Tagline`

Bitscope - The Bitcoin Explorer
Fides ex Numeris

## `dependencies`

1. "@reduxjs/toolkit": "^1.8.1",
1. "@testing-library/jest-dom": "^5.16.4",
1. "@testing-library/react": "^12.1.4",
1. "@testing-library/user-event": "^13.5.0",
1. "axios": "^0.26.1",
1. "react": "^18.0.0",
1. "react-dom": "^18.0.0",
1. "react-redux": "^7.2.8",
1. "react-router-dom": "^6.3.0",
1. "react-scripts": "5.0.0",
1. "redux": "^4.1.2",
1. "redux-persist": "^6.0.0",
1. "uuid": "^8.3.2",
1. "web-vitals": "^2.1.4"

## `Integrated Dependencies`

Tailwind comes integrated with this version of Create-React-App. Just add:

1. frontend/tailwind.config.js
1. frontend/src/index.css

contents of frontend/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## `Notifications`

<Notifications/>

Notifications types and styles

success: bar: bg-green-500, notification: bg-green-100, bar css: .success
notify: bar: bg-blue-500, notification: bg-blue-100, bar css: .notify
error: bar: bg-red-500, notification: bg-red-100, bar css: .error
warning: bar: bg-orange-500, notification: bg-orange-100, bar css: .warning

### `Procedure to generate a notification`

To update notify state and generate a notification:

1. Post/get request
1. Await response
1. if response is valid, send: message: success message, type: success/notify
1. if response is an error, send: message: error message!, type: error/warning

---

# `Backend`

installing the backend

```bash
cd backend
npm install
```

**Note**:

The server on my localhost runs on port: 4000. If this is not available, you can choose any available port and update the environmental variable PORT

## `Running the Server`

In the backend/ directory, you can run:

```bash
lt --port YOURPORT
node main.js
```

**IMPORTANT**

1. Most node variables are environment variables stored in the .env file.

## `Cookies`

```js
// setting the session cookie
document.cookie = `session=${user.token}; max-age:${whatever} `;

//deleting the session cookie
document.cookie = `session=""; max-age=0`;
```

## `Subscription and Logging in`

A user can search for addresses and transaction ids, with the values expressed in BTC. But for more functionality, the user can create an account. Account registration consists of inputting name, surname, email, and choosing a username, password and currency preference. Once the user has created an account, the user can log in by clicking on the profile roundel on the extreme right of the navigation bar. Once a user is logged in, the profile icon will turn orange indicating that a session is active. Values will then be provided in the preferred currency. To terminate the session, the user will have to log out manually or else the session will expire in 4 hours.

## `dependencies`

1. "axios": "^1.5.1",
1. "cookie-parser": "^1.4.6",
1. "cors": "^2.8.5",
1. "dotenv": "^16.0.0",
1. "express": "^4.17.3",
1. "jsonwebtoken": "^8.5.1",
1. "mongodb": "^4.4.0",
1. "nodemailer": "^6.7.2",
1. "nodemon": "^2.0.15",

## `Global Dependencies`

Localtunnel to expose local server to the internet and receive post requests from webhook api

```bash
sudo npm install -g localtunnel
```

To use:

1. Create the tunnel on the port you are running your localhost (ex: http://localhost:4000)

```bash
lt --port 4000
```

Copy the publicly accessible link it gives you, and use as the base url for exeternal POST requests from a webhook api for example.

**Notes**

1. Changes to backend/main.js (the backend server) require restarting main.js to reflect the changes.
1. However as long as the tunnel is still running, you do not need to generate a new one.

---

# `External Services`

## `MongoDB`

Database: ecom
Database name: platform
Collections: platform, subscribers (for subscribers to the newsletter), subscriptions (for subscribers to bitcoin addresses), users (user account records)

---

# `Policies`

## `Registration Policy`

Registration policy

1. Password must contain must contain at least one uppercase character, one lowercase character, one digit, one symbol, between 16 and 128 characters and must not contain any whitespace;
1. Password will be hashed but not encrypted;
1. Username has to be unique. If it is not unique, prevent registration and inform registrant that registration has been stopped because the username has already been registered;
1. Email has to be unique. If it is not unique, prevent registration but only inform registrant that his registration has been stopped because one of his credentials has already been registered. This will protect the privacy of the email account that has already been registered;
1. If both username and email have been registered, tell registrant that the registration has been stopped because one or more of his credentials has already been registered. This will protect the privacy of the email account that has already been registered.
1. Name, Surname, Username, Email & Currency fields will each be encrypted with a secret key and a secret initVector to preserve registrant privacy in case of a database hack or leak.

---
